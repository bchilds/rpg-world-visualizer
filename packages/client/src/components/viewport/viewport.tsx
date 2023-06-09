import { useCallback, useEffect, useState } from 'react';
import { Feature, WorldLocation } from '../../types/location.types';
import WorldNode from '../node/world-location';
import {
    getDefaultWorldLocation,
    useLocationContext,
} from '../../contexts/location.context';
import Details from './details';
import { Space } from '@mantine/core';

const Viewport = () => {
    const {
        currentLocationId,
        setCurrentLocationId,
        allLocations,
        allFeatures,
        setAllLocations,
        setAllFeatures,
        getLocationsByIds,
        getLocationById,
        updateLocation,
    } = useLocationContext();
    const [history, setHistory] = useState<WorldLocation['id'][]>([
        currentLocationId,
    ]);
    const [newLocationName, setNewLocationName] = useState<string>('');
    const [newFeatureName, setNewFeatureName] = useState<string>('');

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
        return allFeatures.filter((feat) =>
            currentLocation?.features?.includes(feat.id)
        );
    });

    const updateCurrentLocationState = (nextCurrentLocation: WorldLocation) => {
        setCurrentLocationId(nextCurrentLocation.id);
        setChildLocations(
            getLocationsByIds(nextCurrentLocation.childLocations ?? [])
        );
        setFeatures(
            allFeatures.filter((feat) =>
                nextCurrentLocation.features?.includes(feat.id)
            )
        );
    };

    const addFeature = () => {
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
        setNewFeatureName('');
    };

    const addChildLocation = () => {
        if (!newLocationName) return;

        const newLocation: WorldLocation = {
            id: allLocations.length,
            name: newLocationName,
            description: '',
            childLocations: [],
            features: [],
        };
        const newChildLocations = [...childLocations, newLocation];
        setChildLocations(newChildLocations);
        setAllLocations([...allLocations, newLocation]);
        updateLocation({
            ...getLocationById(currentLocationId),
            childLocations: newChildLocations.map((loc) => loc.id),
        });
        setNewLocationName('');
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
        updateCurrentLocationState(worldLocation);

        setHistory([...history, worldLocation.id]);
    };

    useEffect(() => {
        // handle loading of data while in viewport mode
        updateCurrentLocationState(
            allLocations.find((loc) => loc.id === currentLocationId) ??
                getDefaultWorldLocation()
        );
    }, [allLocations]);

    return (
        <div className="viewport">
            <div className="viewport-header">
                <WorldNode
                    key={`${currentLocationId}-${
                        getLocationById(currentLocationId).name
                    }`}
                    locationId={currentLocationId}
                    onSelect={() => {}}
                    onUpdate={() => {}}
                    className="current-location"
                />
            </div>
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
        </div>
    );
};

export default Viewport;
