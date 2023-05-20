import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import { Feature, WorldLocation } from '../types/location.types';

export const getDefaultWorldLocation = (): WorldLocation => ({
    id: 0,
    name: 'World Map',
    description: 'The world',
    childLocations: [],
    features: [],
});

type LocationContextType = {
    allLocations: WorldLocation[];
    allFeatures: Feature[];
    setAllLocations: React.Dispatch<React.SetStateAction<WorldLocation[]>>;
    setAllFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
    getLocationById: (locationId: WorldLocation['id']) => WorldLocation;
    getLocationsByIds: (locationIds: WorldLocation['id'][]) => WorldLocation[];
    updateLocation: (location: WorldLocation) => void;
    updateFeature: (feature: Feature) => void;
};

export const LocationContext = createContext<LocationContextType>({
    allLocations: [getDefaultWorldLocation()],
    allFeatures: [],
    setAllLocations: () => {},
    setAllFeatures: () => {},
    getLocationById: () => getDefaultWorldLocation(),
    getLocationsByIds: () => [],
    updateLocation: () => {},
    updateFeature: () => {},
});
export const useLocationContext = () => useContext(LocationContext);

export const LocationProvider = ({ children }: { children: JSX.Element }) => {
    const [allLocations, setAllLocations] = useState<WorldLocation[]>(() => [
        getDefaultWorldLocation(),
    ]);
    const [allFeatures, setAllFeatures] = useState<Feature[]>([]);

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

    const locationContextValue: LocationContextType = useMemo(
        () => ({
            allLocations,
            allFeatures,
            setAllLocations,
            setAllFeatures,
            getLocationsByIds,
            getLocationById,
            updateLocation,
            updateFeature,
        }),
        [
            allLocations,
            allFeatures,
            setAllLocations,
            setAllFeatures,
            getLocationsByIds,
            getLocationById,
            updateLocation,
            updateFeature,
        ]
    );

    return (
        <LocationContext.Provider value={locationContextValue}>
            {children}
        </LocationContext.Provider>
    );
};
