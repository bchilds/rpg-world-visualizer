import { useInputState } from '@mantine/hooks';
import { Feature, WorldLocation } from '../../types/location.types';
import { useCallback } from 'react';
import LargeDetails from './desktop-details';
import MobileDetails from './mobile-details';
import { Character } from '../../types/character.types';

type DetailsProps = {
    onAddFeature: (newFeatureName: string) => void;
    onAddLocation: (newLocationName: string) => void;
    features: Feature[];
    childLocations: WorldLocation[];
    onSelectLocation: (location: WorldLocation) => void;
    onDeleteLocation: (location: WorldLocation) => void;
    onDeleteFeature: (feature: Feature) => void;
    characters: Character[];
};

export type SubDetailsProps = DetailsProps & {
    onAddFeature: () => void;
    onAddLocation: () => void;
    newFeatureName: string;
    setNewFeatureName: ReturnType<typeof useInputState<string>>[1];
    newLocationName: string;
    setNewLocationName: ReturnType<typeof useInputState<string>>[1];
};

// todo sticky accordion controls for opened
// todo tabs for big screen

const Details = ({
    onAddFeature,
    onAddLocation,
    features,
    childLocations,
    onDeleteLocation,
    onDeleteFeature,
    onSelectLocation,
    characters,
}: DetailsProps) => {
    const [newLocationName, setNewLocationName] = useInputState('');
    const [newFeatureName, setNewFeatureName] = useInputState('');

    const _onAddFeature = useCallback(() => {
        onAddFeature(newFeatureName);
        setNewFeatureName('');
    }, [newFeatureName, onAddFeature]);

    const _onAddLocation = useCallback(() => {
        onAddLocation(newLocationName);
        setNewLocationName('');
    }, [newLocationName, onAddLocation]);

    return (
        <>
            <LargeDetails
                onAddFeature={_onAddFeature}
                onAddLocation={_onAddLocation}
                features={features}
                childLocations={childLocations}
                onDeleteLocation={onDeleteLocation}
                onDeleteFeature={onDeleteFeature}
                onSelectLocation={onSelectLocation}
                newFeatureName={newFeatureName}
                setNewFeatureName={setNewFeatureName}
                newLocationName={newLocationName}
                setNewLocationName={setNewLocationName}
                characters={characters}
            />
            <MobileDetails
                onAddFeature={_onAddFeature}
                onAddLocation={_onAddLocation}
                features={features}
                childLocations={childLocations}
                onDeleteLocation={onDeleteLocation}
                onDeleteFeature={onDeleteFeature}
                onSelectLocation={onSelectLocation}
                newFeatureName={newFeatureName}
                setNewFeatureName={setNewFeatureName}
                newLocationName={newLocationName}
                setNewLocationName={setNewLocationName}
                characters={characters}
            />
        </>
    );
};

export default Details;
