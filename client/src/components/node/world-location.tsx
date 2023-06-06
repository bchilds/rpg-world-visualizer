import { useCallback, useState } from 'react';
import { WorldLocation } from '../../types/location.types';
import { useLocationContext } from '../../contexts/location.context';
import SaveControls from './save-controls';

import './node.css';

type WorldNodeProps = {
    locationId: WorldLocation['id'];
    onSelect: () => void;
    onDelete?: () => void;
    onUpdate: (newLocationData: WorldLocation) => void;
    className?: string;
};

export const WorldNode = ({
    locationId,
    onSelect,
    onDelete,
    className = '',
}: WorldNodeProps) => {
    const { getLocationById, updateLocation } = useLocationContext();
    const location = getLocationById(locationId);
    const { name, description = '', childLocations, features } = location;
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
        <div className={`worldnode-container ${className}`} onClick={onSelect}>
            {onDelete && (
                <button
                    className="worldnode-action delete-node"
                    onClick={(e: React.SyntheticEvent) => {
                        //  make close component w/ confirm as double click
                        e.stopPropagation();
                        console.log(`deleting node: ${name}`);
                        onDelete();
                    }}
                >
                    x
                </button>
            )}
            <div className="content">
                <input
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    value={nodeName}
                    onChange={(e) => {
                        setIsDirty(true);
                        setNodeName(e.target.value);
                    }}
                    placeholder="Location Name"
                    onKeyDown={handleEnter}
                />
                <textarea
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    value={nodeDescription}
                    onChange={(e) => {
                        setIsDirty(true);
                        setNodeDescription(e.target.value);
                    }}
                    placeholder="Location Description"
                    onKeyDown={handleEnter}
                />
                <p>Child Locations: {childLocations.length}</p>
                <p>Features: {features.length}</p>
                {isDirty && (
                    <SaveControls onSave={onSave} onCancel={onCancel} />
                )}
            </div>
        </div>
    );
};

export default WorldNode;
