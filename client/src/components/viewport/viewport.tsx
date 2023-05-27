import { useCallback, useEffect, useState } from 'react';
import { Feature, WorldLocation } from '../../types/location.types';
import WorldNode from '../node/world-location';
import {
    getDefaultWorldLocation,
    useLocationContext,
} from '../../contexts/location.context';
import FeatureNode from '../node/feature';

import './viewport.css';

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

    const onBack = () => {
        const newHistory = [...history];
        newHistory.pop();
        setHistory(newHistory);

        const nextNodeId = newHistory[newHistory.length - 1] ?? 0;
        updateCurrentLocationState(
            allLocations.find((loc) => loc.id === nextNodeId) ??
                getDefaultWorldLocation()
        );
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
                    key={`${currentLocationId}-${getLocationById(currentLocationId).name}`}
                    locationId={currentLocationId}
                    onSelect={() => {}}
                    onUpdate={() => {}}
                />
                <div className="controls">
                    <button disabled={history.length === 1} onClick={onBack}>
                        Back
                    </button>
                    <div>
                        <input
                            type="text"
                            placeholder="New Feature"
                            value={newFeatureName}
                            onChange={(e) => setNewFeatureName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') addFeature();
                            }}
                        />
                        <button onClick={addFeature}>+</button>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="New Location"
                            value={newLocationName}
                            onChange={(e) => setNewLocationName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') addChildLocation();
                            }}
                        />
                        <button onClick={addChildLocation}>+</button>
                    </div>
                </div>
                {/* this should be done w/ react router */}
            </div>
            <div className="list-container">
                {/* move controls into respective list */}
                <div className="feature-list list">
                    {features.map((feature) => (
                        <FeatureNode
                            key={feature.id}
                            feature={feature}
                            onDelete={deleteFeature}
                        />
                    ))}
                </div>
                <div className="world-location-list list">
                    {childLocations.map((location) => (
                        <WorldNode
                            locationId={location.id}
                            key={location.id}
                            onSelect={() => onSelectNode(location)}
                            onDelete={() => deleteChildLocation(location)}
                            onUpdate={function (
                                newLocationData: WorldLocation
                            ): void {
                                throw new Error('Function not implemented.');
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Viewport;
