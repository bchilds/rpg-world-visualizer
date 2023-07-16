import { useCallback, useState } from 'react';
import { TextInput, Textarea } from '@mantine/core';
import { WorldLocation } from '../../types/location.types';
import { useLocationContext } from '../../contexts/location.context';
import SaveControls from './save-controls';
import NodeCardComponent from './node-card-component';

type WorldNodeProps = {
    locationId: WorldLocation['id'];
    onSelect: () => void;
    onDelete?: () => void;
    onUpdate: (newLocationData: WorldLocation) => void;
    canNavigate?: boolean;
};

export const WorldNode = ({
    locationId,
    onSelect,
    onDelete,
    canNavigate = false,
}: WorldNodeProps) => {
    const { getLocationById, updateLocation } = useLocationContext();
    const location = getLocationById(locationId);
    const { name, description = '' } = location;
    const [nodeName, setNodeName] = useState<string>(name);
    const [nodeDescription, setNodeDescription] = useState<string>(description);
    const [isDirty, setIsDirty] = useState<boolean>(false);

    const _updateLocation = () => {
        updateLocation({
            ...location,
            name: nodeName,
            description: nodeDescription,
        });
        setIsDirty(false);
    };

    const handleEnter = (
        event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (event.key === 'Enter' && event.shiftKey === false) {
            event.preventDefault();
            event.stopPropagation();
            _updateLocation();
        }
    };

    const onSave = useCallback(() => {
        _updateLocation();
    }, [_updateLocation]);

    const onCancel = useCallback(() => {
        setNodeName(name);
        setNodeDescription(description);
        setIsDirty(false);
    }, [name, description]);

    return (
        <NodeCardComponent
            onSelect={onSelect}
            onDelete={onDelete}
            canNavigate={canNavigate}
        >
            <TextInput
                value={nodeName}
                onChange={(e) => {
                    setIsDirty(true);
                    setNodeName(e.target.value);
                }}
                placeholder="Location Name"
                onKeyDown={handleEnter}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            />
            <Textarea
                autosize
                value={nodeDescription}
                onChange={(e) => {
                    setIsDirty(true);
                    setNodeDescription(e.target.value);
                }}
                placeholder="Location Description"
                onKeyDown={handleEnter}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                maxRows={8}
            />
            {isDirty && <SaveControls onSave={onSave} onCancel={onCancel} />}
        </NodeCardComponent>
    );
};

export default WorldNode;
