import { useCallback, useEffect, useState } from 'react';
import { Feature, WorldLocation } from '../../types/location.types';
import WorldNode from '../node/world-location';
import {
    getDefaultWorldLocation,
    useGlobalContext,
} from '../../contexts/global.context';
import Details from './details';
import { Box, Space, Text } from '@mantine/core';
import { getCurrentWorldName } from '../../services/local-storage-api';

const Viewport = () => {
    const {
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
    } = useGlobalContext();
    const currentWorldName = getCurrentWorldName();
    const [history, setHistory] = useState<WorldLocation['id'][]>([
        currentLocationId,
    ]);
    const [childLocations, setChildLocations] = useState<WorldLocation[]>(() =>
        getLocationsByIds(
            allLocations.find((loc) => loc.id === currentLocationId)
                ?.childLocations ?? []
        )
    );
    const [features, setFeatures] = useState<Feature[]>(() => {
        const currentLocation = allLocations.find(
            (loc) => loc.id === currentLocationId
        );
        return allFeatures.filter(
            (feat) => currentLocation?.features?.includes(feat.id)
        );
    });

    const [characters, setCharacters] = useState<Feature[]>(() => {
        const currentLocation = allLocations.find(
            (loc) => loc.id === currentLocationId
        );
        return allCharacters.filter(
            (char) => currentLocation?.characters?.includes(char.id)
        );
    });

    const addFeature = (newFeatureName: string) => {
        if (!newFeatureName) return;

        const newFeature: Feature = {
            id: allFeatures.length,
            name: newFeatureName,
            description: '',
        };
        setFeatures([...features, newFeature]);
        setAllFeatures([...allFeatures, newFeature]);
        updateLocation({
            ...getLocationById(currentLocationId),
            features: [...features, newFeature].map((feat) => feat.id),
        });
    };

    const addChildLocation = (newLocationName: string) => {
        if (!newLocationName) return;

        const newLocation: WorldLocation = {
            id: allLocations.length,
            name: newLocationName,
            description: '',
            childLocations: [],
            features: [],
            characters: [],
        };
        const newChildLocations = [...childLocations, newLocation];
        setChildLocations(newChildLocations);
        setAllLocations([...allLocations, newLocation]);
        updateLocation({
            ...getLocationById(currentLocationId),
            childLocations: newChildLocations.map((loc) => loc.id),
        });
    };

    const deleteChildLocation = useCallback(
        (location: WorldLocation) => {
            const newChildLocations = childLocations.filter(
                (childLocation) => childLocation.id !== location.id
            );
            setChildLocations(newChildLocations);
            updateLocation({
                ...getLocationById(currentLocationId),
                childLocations: newChildLocations.map((loc) => loc.id),
            });
            setAllLocations(
                allLocations.filter(
                    (childLocation) => childLocation.id !== location.id
                )
            );
        },
        [childLocations, allLocations]
    );

    const deleteFeature = useCallback(
        (feature: Feature) => {
            const newFeatures = features.filter(
                (feat) => feat.id !== feature.id
            );
            setFeatures(newFeatures);
            updateLocation({
                ...getLocationById(currentLocationId),
                features: newFeatures.map((feat) => feat.id),
            });
            setAllFeatures(
                allFeatures.filter((feat) => feat.id !== feature.id)
            );
        },
        [features, allFeatures]
    );

    const onSelectNode = (worldLocation: WorldLocation) => {
        console.log('selecting node: ', worldLocation.name);
        setCurrentLocationId(worldLocation.id);

        setHistory([...history, worldLocation.id]);
    };

    useEffect(() => {
        // handle loading of world while in viewport mode
        const location =
            allLocations.find((loc) => loc.id === currentLocationId) ??
            getDefaultWorldLocation();
        setCurrentLocationId(location.id);
    }, [allLocations]);

    useEffect(() => {
        // currentLocationId can change from other places, so this is a way to keep the state in sync regardless of how it changes
        const nextLocation = getLocationById(currentLocationId);
        setChildLocations(getLocationsByIds(nextLocation.childLocations ?? []));
        setFeatures(
            allFeatures.filter(
                (feat) => nextLocation.features?.includes(feat.id)
            )
        );
    }, [currentLocationId, currentWorldName]);

    return (
        <Box maw={'50rem'} w={'100%'}>
            <Text mb="md">
                Add features to describe a location, or child locations.
            </Text>
            <WorldNode
                key={`${currentLocationId}-${
                    getLocationById(currentLocationId).name
                }`}
                locationId={currentLocationId}
                onSelect={() => {}}
                onUpdate={() => {}}
            />
            <Space h="md" />
            <Details
                onAddFeature={addFeature}
                onAddLocation={addChildLocation}
                onDeleteFeature={deleteFeature}
                onDeleteLocation={deleteChildLocation}
                features={features}
                childLocations={childLocations}
                onSelectLocation={onSelectNode}
            />
        </Box>
    );
};

export default Viewport;
