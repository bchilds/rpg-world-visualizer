import { MediaQuery, Accordion } from '@mantine/core';
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
    );
};

export default MobileDetails;
