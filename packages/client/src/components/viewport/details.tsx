import { Accordion, Group, MediaQuery, Stack } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import InputWithButton from '../common/input-with-button';
import { Feature, WorldLocation } from '../../types/location.types';
import FeatureNode from '../node/feature';
import WorldNode from '../node/world-location';

type DetailsProps = {
    onAddFeature: () => void;
    onAddLocation: () => void;
    features: Feature[];
    childLocations: WorldLocation[];
    onSelectLocation: (location: WorldLocation) => void;
    onDeleteLocation: (location: WorldLocation) => void;
    onDeleteFeature: (feature: Feature) => void;
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
}: DetailsProps) => {
    const [newLocationName, setNewLocationName] = useInputState('');
    const [newFeatureName, setNewFeatureName] = useInputState('');

    return (
        <>
            <MediaQuery
                smallerThan="sm"
                styles={{
                    display: 'none',
                    background: 'red',
                    border: '8px solid pink',
                }}
            >
                <Stack>
                    <Group position="center" grow>
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
                            onClick={onAddFeature}
                            variant="filled"
                            color="gray"
                            radius="sm"
                            buttonText="+"
                            styles={{
                                input: {
                                    width: '95%',
                                },
                                rightSection: {
                                    width: 'auto',
                                },
                            }}
                        />
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
                            styles={{
                                input: {
                                    width: '95%',
                                },
                                rightSection: {
                                    width: 'auto',
                                },
                            }}
                        />
                    </Group>
                    {/* temporary */}
                    <div className="list-container">
                        <div className="feature-list list">
                            {features.map((feature) => (
                                <FeatureNode
                                    key={feature.id}
                                    feature={feature}
                                    onDelete={onDeleteFeature}
                                />
                            ))}
                        </div>
                        <div className="world-location-list list">
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
                                />
                            ))}
                        </div>
                    </div>
                </Stack>
            </MediaQuery>
            <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
                <Accordion defaultValue={'feature'}>
                    <Accordion.Item value="feature">
                        <Accordion.Control>Features</Accordion.Control>
                        <Accordion.Panel>
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
                                onClick={onAddFeature}
                                variant="filled"
                                color="gray"
                                radius="sm"
                                buttonText="+"
                                mb={'sm'}
                            />
                            <div className="list-container">
                                <div className="feature-list list">
                                    {features.map((feature) => (
                                        <FeatureNode
                                            key={feature.id}
                                            feature={feature}
                                            onDelete={onDeleteFeature}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="location">
                        <Accordion.Control>Locations</Accordion.Control>
                        <Accordion.Panel>
                            <InputWithButton
                                placeholder="New Location"
                                value={newLocationName}
                                onChange={(e) =>
                                    setNewLocationName(e.target.value)
                                }
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
                                mb={'sm'}
                            />
                            <div className="list-container">
                                <div className="world-location-list list">
                                    {childLocations.map((location) => (
                                        <WorldNode
                                            locationId={location.id}
                                            key={location.id}
                                            onSelect={() =>
                                                onSelectLocation(location)
                                            }
                                            onDelete={() =>
                                                onDeleteLocation(location)
                                            }
                                            onUpdate={function (
                                                newLocationData: WorldLocation
                                            ): void {
                                                throw new Error(
                                                    'Function not implemented.'
                                                );
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="characters">
                        <Accordion.Control>Characters</Accordion.Control>
                        <Accordion.Panel></Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </MediaQuery>
        </>
    );
};

export default Details;
