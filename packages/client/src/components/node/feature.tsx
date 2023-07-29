import { useCallback, useEffect, useState } from 'react';
import { Feature } from '../../types/location.types';
import SaveControls from './save-controls';
import { useGlobalContext } from '../../contexts/global.context';

import NodeCardComponent from './node-card-component';
import { TextInput, Textarea } from '@mantine/core';
import { useInputState } from '@mantine/hooks';

const FeatureNode = ({
    feature,
    onDelete,
}: {
    feature: Feature;
    onDelete: (feature: Feature) => void;
}) => {
    const { updateFeature } = useGlobalContext();
    const [name, setName] = useInputState(feature.name);
    const [description, setDescription] = useInputState(feature.description);
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

    const _onDelete = useCallback(() => {
        onDelete(feature);
    }, [feature]);

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
        <NodeCardComponent onDelete={_onDelete}>
            <TextInput
                value={name}
                onChange={setName}
                onKeyDown={handleEnter}
                placeholder="Name of feature"
            />
            <Textarea
                value={description}
                onChange={setDescription}
                onKeyDown={handleEnter}
                placeholder="Description of feature"
                autosize
                maxRows={8}
            />
            {isDirty && (
                <SaveControls
                    onSave={_updateFeature}
                    onCancel={_cancelUpdateFeature}
                />
            )}
        </NodeCardComponent>
    );
};

export default FeatureNode;
