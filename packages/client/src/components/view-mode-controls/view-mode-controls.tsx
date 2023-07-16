import React from 'react';
import { ViewMode, viewModes } from '../../types/view-modes.types';
import { Button, Group } from '@mantine/core';

type ViewModeControlsProps = {
    onClick: React.Dispatch<React.SetStateAction<ViewMode>>;
    viewMode: string;
};

const ViewModeControls = ({ onClick, viewMode }: ViewModeControlsProps) => {
    return (
        <Group spacing={'xs'}>
            <Button
                color={viewMode === 'viewport' ? 'green' : 'default'}
                onClick={() => onClick(viewModes.viewport)}
                className={viewMode === 'viewport' ? 'selected' : ''}
            >
                Viewport
            </Button>
            <Button
                color={viewMode === 'overview' ? 'green' : 'default'}
                onClick={() => onClick(viewModes.overview)}
                className={viewMode === 'overview' ? 'selected' : ''}
            >
                Overview
            </Button>
        </Group>
    );
};

export default ViewModeControls;
