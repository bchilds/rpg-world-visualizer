import {
    Text,
    MediaQuery,
    Accordion,
    Badge,
    Group,
    Stack,
} from '@mantine/core';
import { WorldLocation } from '../../types/location.types';
import InputWithButton from '../common/input-with-button';
import FeatureNode from '../node/feature';
import WorldNode from '../node/world-location';
import { SubDetailsProps } from './details';

const MobileDetails = (props: SubDetailsProps) => {
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
    } = props;
    return (
        <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
            <Accordion>
                <Accordion.Item value="feature">
                    <Accordion.Control>
                        <Group>
                            <Text>Features</Text>
                            <Badge variant="filled">{features.length}</Badge>
                        </Group>
                    </Accordion.Control>
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
                            variant="filled"
                            color="gray"
                            radius="sm"
                            buttonText="+"
                            mb={'sm'}
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
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="location">
                    <Accordion.Control>
                        <Group>
                            <Text>Locations</Text>
                            <Badge variant="filled">
                                {childLocations.length}
                            </Badge>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
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
                            mb={'sm'}
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
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="characters">
                    <Accordion.Control>
                        <Group>
                            <Text>Characters</Text>
                            <Badge variant="filled">x</Badge>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel></Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </MediaQuery>
    );
};

export default MobileDetails;
