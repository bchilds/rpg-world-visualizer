import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Feature, WorldLocation } from '../types/location.types';
import convertToD3Tree from '../components/overview/d3-tree';
import { LocalStorageWorldsMap } from '../types/local-storage.types';
import {
    addOrUpdateWorld,
    getCurrentWorld,
    getWorlds,
    removeWorld,
    setCurrentWorld,
} from '../services/local-storage-api';
import {
    generateCompressedString,
    loadDataFromCompressedString,
} from '../services/data-loader';
import { Character } from '../types/character.types';

export const getDefaultWorldLocation = (): WorldLocation => ({
    id: 0,
    name: 'World Map',
    description: 'The world',
    childLocations: [],
    features: [],
    characters: [],
});

type GlobalContext = {
    currentLocationId: WorldLocation['id'];
    setCurrentLocationId: React.Dispatch<
        React.SetStateAction<WorldLocation['id']>
    >;
    allLocations: WorldLocation[];
    allFeatures: Feature[];
    allCharacters: Character[];
    setAllLocations: React.Dispatch<React.SetStateAction<WorldLocation[]>>;
    setAllFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
    setAllCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
    getLocationById: (locationId: WorldLocation['id']) => WorldLocation;
    getLocationsByIds: (locationIds: WorldLocation['id'][]) => WorldLocation[];
    updateLocation: (location: WorldLocation) => void;
    updateFeature: (feature: Feature) => void;
    updateCharacter: (character: Character) => void;
    convertNodeToTree: (id: WorldLocation['id']) => any;
    worlds: LocalStorageWorldsMap;
    loadWorldFromCompressedString: (compressedString: string) => void;
    generateCompressedStringForWorld: () => string;
    createNewWorld: () => void;
};

let initialWorldLoad: ReturnType<typeof loadDataFromCompressedString>;
const currentWorldCompressed = getCurrentWorld();
if (window.location.hash || currentWorldCompressed) {
    // prefer hash over local storage
    const compressedString =
        window.location.hash.slice(1) ||
        currentWorldCompressed.worldTreeCompressed;
    initialWorldLoad = loadDataFromCompressedString(compressedString);
    if (initialWorldLoad) {
        setCurrentWorld(initialWorldLoad.allLocations[0].name);
    }
    window.location.hash = '';
}

export const GlobalContext = createContext<GlobalContext>({
    currentLocationId: 0,
    setCurrentLocationId: () => {},
    allLocations: initialWorldLoad?.allLocations ?? [getDefaultWorldLocation()],
    allFeatures: initialWorldLoad?.allFeatures ?? [],
    allCharacters: initialWorldLoad?.allCharacters ?? [],
    worlds: {},
    setAllLocations: () => {},
    setAllFeatures: () => {},
    setAllCharacters: () => {},
    getLocationById: () => getDefaultWorldLocation(),
    getLocationsByIds: () => [],
    updateLocation: () => {},
    updateFeature: () => {},
    updateCharacter: () => {},
    convertNodeToTree: () => {},
    loadWorldFromCompressedString: () => {},
    generateCompressedStringForWorld: () => '',
    createNewWorld: () => {},
});
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [worlds, setWorlds] = useState<LocalStorageWorldsMap>(() => {
        const storageWorlds = getWorlds();
        return storageWorlds;
    });
    const [allLocations, setAllLocations] = useState<WorldLocation[]>(() => {
        const defaultLocation = getDefaultWorldLocation();
        return initialWorldLoad?.allLocations ?? [defaultLocation];
    });
    const [allFeatures, setAllFeatures] = useState<Feature[]>(() => {
        return initialWorldLoad?.allFeatures ?? [];
    });
    const [allCharacters, setAllCharacters] = useState<Character[]>(() => {
        return initialWorldLoad?.allCharacters ?? [];
    });
    const [currentLocationId, setCurrentLocationId] = useState(0);

    const createNewWorld = useCallback(() => {
        const defaultLocation = getDefaultWorldLocation();
        setAllLocations([defaultLocation]);
        setAllFeatures([]);
        setCurrentLocationId(defaultLocation.id);
        setCurrentWorld(defaultLocation.name);
    }, [setAllFeatures, setAllLocations, setCurrentLocationId]);

    // loads the world tree from compressed string data
    const loadWorldFromCompressedString = useCallback(
        (compressedString: string) => {
            const data = loadDataFromCompressedString(compressedString);
            if (data) {
                const {
                    allLocations: newAllLocations,
                    allFeatures: newAllFeatures,
                } = data;

                setAllLocations(newAllLocations);
                setAllFeatures(newAllFeatures);
                setCurrentWorld(data.allLocations[0].name);
            }
        },
        [allLocations, allFeatures]
    );

    // generates a new compressed string for the current world
    const generateCompressedStringForWorld = useCallback(() => {
        const data = {
            allLocations,
            allFeatures,
            allCharacters,
        };
        const compressedString = generateCompressedString(data);
        return compressedString;
    }, [allFeatures, allLocations, allCharacters]);

    // get locations from list of IDs
    const getLocationsByIds = useCallback(
        (locationIds: WorldLocation['id'][]) => {
            return allLocations.filter((loc) => locationIds.includes(loc.id));
        },
        [allLocations]
    );

    // get location from ID
    const getLocationById = useCallback(
        (locationId: WorldLocation['id']) => {
            return (
                allLocations.find((loc) => loc.id === locationId) ??
                getDefaultWorldLocation()
            );
        },
        [allLocations]
    );

    // update location
    const updateLocation = useCallback(
        (location: WorldLocation) => {
            setAllLocations((prevLocations) => {
                const nextLocations = [...prevLocations];
                const locationIndex = nextLocations.findIndex(
                    (loc) => loc.id === location.id
                );
                nextLocations[locationIndex] = location;

                return nextLocations;
            });

            // if root location, we should check if the name of the world has changed
            if (location.id === 0 && !worlds[location.name]) {
                // if it has, we need to update worlds and local storage

                // get the previous name of the root location
                const previousRootLocation = allLocations[0];
                const previousRootLocationName = previousRootLocation.name;

                // see if there is a world with the same name
                const worldWithSameName = Object.values(worlds).find(
                    (world) => world.name === previousRootLocationName
                );

                // if there's a world with the same name, remove it from local storage
                if (worldWithSameName) {
                    removeWorld(worldWithSameName.name);
                }
                addOrUpdateWorld(location.name, '');
                setCurrentWorld(location.name);

                const newWorlds = getWorlds();
                setWorlds(newWorlds);
            }
        },
        [setAllLocations, allLocations]
    );

    // update feature
    const updateFeature = useCallback(
        (feature: Feature) => {
            setAllFeatures((prevFeatures) => {
                const nextFeatures = [...prevFeatures];
                const featureIndex = nextFeatures.findIndex(
                    (feat) => feat.id === feature.id
                );
                nextFeatures[featureIndex] = feature;
                return nextFeatures;
            });
        },
        [setAllFeatures]
    );

    // update character
    const updateCharacter = useCallback(
        (character: Character) => {
            setAllCharacters((prevCharacters) => {
                const nextCharacters = [...prevCharacters];
                const characterIndex = nextCharacters.findIndex(
                    (char) => char.id === character.id
                );
                nextCharacters[characterIndex] = character;
                return nextCharacters;
            });
        },
        [setAllCharacters]
    );

    // builds a tree from target node
    const convertNodeToTree = useCallback(
        (id: WorldLocation['id']) => {
            const node = getLocationById(id);
            const tree = convertToD3Tree(node, getLocationById);
            return tree;
        },
        [getLocationById]
    );

    // generate new compressed string for current world on data change
    useEffect(() => {
        const currentWorld = getLocationById(0);
        const defaultLocation = getDefaultWorldLocation();

        if (currentWorld.name === defaultLocation.name) {
            return;
        }

        // get new string
        const newCompressedStringForCurrentWorld =
            generateCompressedStringForWorld();

        // update local storage
        addOrUpdateWorld(currentWorld.name, newCompressedStringForCurrentWorld);

        // update worlds
        const newWorlds = getWorlds();
        setWorlds(newWorlds);
    }, [allLocations, allFeatures, allCharacters, getLocationById]);

    const globalContextValue: GlobalContext = useMemo(
        () => ({
            currentLocationId,
            setCurrentLocationId,
            allLocations,
            allFeatures,
            allCharacters,
            setAllLocations,
            setAllFeatures,
            setAllCharacters,
            getLocationsByIds,
            getLocationById,
            updateLocation,
            updateFeature,
            updateCharacter,
            convertNodeToTree,
            worlds,
            loadWorldFromCompressedString,
            generateCompressedStringForWorld,
            createNewWorld,
        }),
        [
            currentLocationId,
            setCurrentLocationId,
            allLocations,
            allFeatures,
            allCharacters,
            setAllLocations,
            setAllFeatures,
            setAllCharacters,
            getLocationsByIds,
            getLocationById,
            updateLocation,
            updateFeature,
            updateCharacter,
            convertNodeToTree,
            worlds,
            loadWorldFromCompressedString,
            generateCompressedStringForWorld,
            createNewWorld,
        ]
    );

    return (
        <GlobalContext.Provider value={globalContextValue}>
            {children}
        </GlobalContext.Provider>
    );
};
