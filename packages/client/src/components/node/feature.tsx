import { useCallback, useEffect, useState } from 'react';
import { Feature } from '../../types/location.types';
import SaveControls from './save-controls';
import { useLocationContext } from '../../contexts/location.context';

import './node.css';

const FeatureNode = ({
    feature,
    onDelete,
}: {
    feature: Feature;
    onDelete: (feature: Feature) => void;
}) => {
    const { updateFeature } = useLocationContext();
    const [name, setName] = useState(feature.name);
    const [description, setDescription] = useState(feature.description);
    const [isDirty, setIsDirty] = useState(false);

    const checkIsDirty = () => {
        if (name !== feature.name || description !== feature.description) {
            setIsDirty(true);
        } else {
            setIsDirty(false);
        }
    };

    useEffect(() => {
        checkIsDirty();
    }, [name, description]);

    const _updateFeature = useCallback(() => {
        updateFeature({ ...feature, name, description });
        setIsDirty(false);
    }, [name, description]);

    const _cancelUpdateFeature = useCallback(() => {
        setName(feature.name);
        setDescription(feature.description);
        setIsDirty(false);
    }, [feature]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDescription(event.target.value);
    };

    const handleEnter = (
        event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (event.key === 'Enter' && event.shiftKey === false) {
            event.preventDefault();
            event.stopPropagation();
            _updateFeature();
        }
    };

    return (
        <div className="feature-container">
            <button className="delete-node" onClick={() => onDelete(feature)}>x</button>
            <input
                type="text"
                value={name}
                onChange={handleNameChange}
                onKeyDown={handleEnter}
                placeholder="Name of feature"
            />
            <textarea
                value={description}
                onChange={handleDescriptionChange}
                onKeyDown={handleEnter}
                placeholder="Description of feature"
            />
            {isDirty && (
                <SaveControls
                    onSave={_updateFeature}
                    onCancel={_cancelUpdateFeature}
                />
            )}
        </div>
    );
};

export default FeatureNode;
