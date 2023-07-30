import { ComponentProps } from 'react';
import { MediaQuery, Tabs, Badge, Stack } from '@mantine/core';
import { WorldLocation } from '../../types/location.types';
import InputWithButton from '../common/input-with-button';
import FeatureNode from '../node/feature';
import WorldNode from '../node/world-location';
import { SubDetailsProps } from './details';
import CharacterCard from '../characters/character-card';

const TAB_NAMES = {
    features: 'features',
    locations: 'locations',
    characters: 'characters',
} as const;

const inputWButtonStyles: ComponentProps<typeof InputWithButton>['styles'] = {
    root: {
        margin: '0 auto',
        maxWidth: '28rem',
    },
    input: {
        width: '95%',
    },
    rightSection: {
        width: 'auto',
    },
};

const LargeDetails = (props: SubDetailsProps) => {
    const {
        onAddFeature,
        onAddLocation,
        features,
        childLocations,
        onDeleteFeature,
        onDeleteLocation,
        onSelectLocation,
        newFeatureName,
        setNewFeatureName,
        newLocationName,
        setNewLocationName,
        characters,
        currentLocationId,
    } = props;

    return (
        <MediaQuery
            smallerThan="sm"
            styles={{
                display: 'none',
                background: 'red',
                border: '8px solid pink',
            }}
        >
            <Tabs color="green" defaultValue={TAB_NAMES.features} loop>
                <Tabs.List position="center" grow>
                    <Tabs.Tab
                        value={TAB_NAMES.features}
                        rightSection={
                            <Badge variant="filled">{features.length}</Badge>
                        }
                    >
                        Features
                    </Tabs.Tab>
                    <Tabs.Tab
                        value={TAB_NAMES.locations}
                        rightSection={
                            <Badge variant="filled">
                                {childLocations.length}
                            </Badge>
                        }
                    >
                        Locations
                    </Tabs.Tab>
                    <Tabs.Tab
                        value={TAB_NAMES.characters}
                        rightSection={
                            <Badge variant="filled">{characters.length}</Badge>
                        }
                    >
                        Characters
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel pt="xs" value={TAB_NAMES.features}>
                    <InputWithButton
                        placeholder="New Feature"
                        value={newFeatureName}
                        onChange={setNewFeatureName}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onAddFeature();
                            }
                        }}
                        onButtonClick={onAddFeature}
                        variant="filled"
                        color="gray"
                        radius="sm"
                        buttonText="+"
                        styles={inputWButtonStyles}
                        mb="xs"
                    />
                    <Stack>
                        {features.map((feature) => (
                            <FeatureNode
                                key={feature.id}
                                feature={feature}
                                onDelete={onDeleteFeature}
                            />
                        ))}
                    </Stack>
                </Tabs.Panel>
                <Tabs.Panel pt="xs" value={TAB_NAMES.locations}>
                    <InputWithButton
                        placeholder="New Location"
                        value={newLocationName}
                        onChange={(e) => setNewLocationName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onAddLocation();
                            }
                        }}
                        onButtonClick={onAddLocation}
                        variant="filled"
                        color="gray"
                        radius="sm"
                        buttonText="+"
                        styles={inputWButtonStyles}
                        mb="xs"
                    />
                    <Stack>
                        {childLocations.map((location) => (
                            <WorldNode
                                locationId={location.id}
                                key={location.id}
                                onSelect={() => onSelectLocation(location)}
                                onDelete={() => onDeleteLocation(location)}
                                onUpdate={function (
                                    newLocationData: WorldLocation
                                ): void {
                                    throw new Error(
                                        'Function not implemented.'
                                    );
                                }}
                                canNavigate
                            />
                        ))}
                    </Stack>
                </Tabs.Panel>
                <Tabs.Panel pt="xs" value={TAB_NAMES.characters}>
                    <Stack>
                        {characters.map((character) => (
                            <CharacterCard
                                key={character.id}
                                id={character.id}
                                currentLocationId={currentLocationId}
                            />
                        ))}
                    </Stack>
                </Tabs.Panel>
            </Tabs>
        </MediaQuery>
    );
};

export default LargeDetails;
