import { MediaQuery, Stack, Group } from '@mantine/core';
import { WorldLocation } from '../../types/location.types';
import InputWithButton from '../common/input-with-button';
import FeatureNode from '../node/feature';
import WorldNode from '../node/world-location';
import { SubDetailsProps } from './details';

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
    );
};

export default LargeDetails;