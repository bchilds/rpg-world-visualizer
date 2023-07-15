import React from 'react';
import { ViewMode, viewModes } from '../../types/view-modes.types';
import './view-mode-controls.css';
import { Button } from '@mantine/core';

type ViewModeControlsProps = {
    onClick: React.Dispatch<React.SetStateAction<ViewMode>>;
    viewMode: string;
};

const ViewModeControls = ({ onClick, viewMode }: ViewModeControlsProps) => {
    return (
        <div className="view-mode-controls">
            <Button
                onClick={() => onClick(viewModes.viewport)}
                className={viewMode === 'viewport' ? 'selected' : ''}
            >
                Viewport
            </Button>
            <Button
                onClick={() => onClick(viewModes.overview)}
                className={viewMode === 'overview' ? 'selected' : ''}
            >
                Overview
            </Button>
        </div>
    );
};

export default ViewModeControls;
