import React from 'react';
import { ViewMode, viewModes } from '../../types/view-modes.types';
import './view-mode-controls.css';

type ViewModeControlsProps = {
    onClick: React.Dispatch<React.SetStateAction<ViewMode>>;
    viewMode: string;
};

const ViewModeControls = ({ onClick, viewMode }: ViewModeControlsProps) => {
    return (
        <div className="view-mode-controls">
            <button
                onClick={() => onClick(viewModes.viewport)}
                className={viewMode === 'viewport' ? 'selected' : ''}
            >
                Viewport
            </button>
            <button
                onClick={() => onClick(viewModes.overview)}
                className={viewMode === 'overview' ? 'selected' : ''}
            >
                Overview
            </button>
        </div>
    );
};

export default ViewModeControls;
