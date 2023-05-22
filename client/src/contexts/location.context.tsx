import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import { Feature, WorldLocation } from '../types/location.types';
import convertToD3Tree from '../components/overview/d3-tree';

export const getDefaultWorldLocation = (): WorldLocation => ({
    id: 0,
    name: 'World Map',
    description: 'The world',
    childLocations: [],
    features: [],
});

// TODO convert allLocations and allFeatures to maps

type LocationContextType = {
    currentLocationId: WorldLocation['id'];
    setCurrentLocationId: React.Dispatch<
        React.SetStateAction<WorldLocation['id']>
    >;
    allLocations: WorldLocation[];
    allFeatures: Feature[];
    setAllLocations: React.Dispatch<React.SetStateAction<WorldLocation[]>>;
    setAllFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
    getLocationById: (locationId: WorldLocation['id']) => WorldLocation;
    getLocationsByIds: (locationIds: WorldLocation['id'][]) => WorldLocation[];
    updateLocation: (location: WorldLocation) => void;
    updateFeature: (feature: Feature) => void;
    convertNodeToTree: (id: WorldLocation['id']) => any;
};

export const LocationContext = createContext<LocationContextType>({
    currentLocationId: 0,
    setCurrentLocationId: () => {},
    allLocations: [getDefaultWorldLocation()],
    allFeatures: [],
    setAllLocations: () => {},
    setAllFeatures: () => {},
    getLocationById: () => getDefaultWorldLocation(),
    getLocationsByIds: () => [],
    updateLocation: () => {},
    updateFeature: () => {},
    convertNodeToTree: () => {},
});
export const useLocationContext = () => useContext(LocationContext);

export const LocationProvider = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => {
    const [allLocations, setAllLocations] = useState<WorldLocation[]>(() => [
        getDefaultWorldLocation(),
    ]);
    const [allFeatures, setAllFeatures] = useState<Feature[]>([]);
    const [currentLocationId, setCurrentLocationId] = useState(0);

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
        },
        [setAllLocations]
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

    // builds a tree from target node
    const convertNodeToTree = (id: WorldLocation['id']) => {
        const node = getLocationById(id);
        const tree = convertToD3Tree(node, getLocationById);
        return tree;
    };

    const locationContextValue: LocationContextType = useMemo(
        () => ({
            currentLocationId,
            setCurrentLocationId,
            allLocations,
            allFeatures,
            setAllLocations,
            setAllFeatures,
            getLocationsByIds,
            getLocationById,
            updateLocation,
            updateFeature,
            convertNodeToTree,
        }),
        [
            currentLocationId,
            setCurrentLocationId,
            allLocations,
            allFeatures,
            setAllLocations,
            setAllFeatures,
            getLocationsByIds,
            getLocationById,
            updateLocation,
            updateFeature,
            convertNodeToTree,
        ]
    );

    return (
        <LocationContext.Provider value={locationContextValue}>
            {children}
        </LocationContext.Provider>
    );
};
