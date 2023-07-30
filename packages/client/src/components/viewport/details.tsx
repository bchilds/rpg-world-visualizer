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
    currentLocationId: WorldLocation['id'];
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
    currentLocationId,
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

    // TODO make tabs/accordion controlled so that there's consistency in behavior on resize

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
                currentLocationId={currentLocationId}
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
                currentLocationId={currentLocationId}
            />
        </>
    );
};

export default Details;
