import React from 'react';
import { ViewMode, viewModes } from '../../types/view-modes.types';
import { Button, MediaQuery } from '@mantine/core';

type ViewModeControlsProps = {
    onClick: React.Dispatch<React.SetStateAction<ViewMode>>;
    viewMode: ViewMode;
};

const ViewModeControls = ({ onClick, viewMode }: ViewModeControlsProps) => {
    return (
        <>
            <MediaQuery smallerThan={'sm'} styles={{ display: 'none ' }}>
                <Button.Group>
                    <Button
                        color={viewMode === 'viewport' ? 'green' : 'default'}
                        onClick={() => onClick(viewModes.viewport)}
                        className={viewMode === 'viewport' ? 'selected' : ''}
                    >
                        Locations
                    </Button>
                    <Button
                        color={viewMode === 'characters' ? 'green' : 'default'}
                        onClick={() => onClick(viewModes.characters)}
                        className={viewMode === 'characters' ? 'selected' : ''}
                    >
                        Characters
                    </Button>
                    <Button
                        color={viewMode === 'overview' ? 'green' : 'default'}
                        onClick={() => onClick(viewModes.overview)}
                        className={viewMode === 'overview' ? 'selected' : ''}
                    >
                        Overview
                    </Button>
                </Button.Group>
            </MediaQuery>
            <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
                <Button.Group>
                    <Button
                        size="xs"
                        color={viewMode === 'viewport' ? 'green' : 'default'}
                        onClick={() => onClick(viewModes.viewport)}
                        className={viewMode === 'viewport' ? 'selected' : ''}
                    >
                        Viewport
                    </Button>
                    <Button
                        size="xs"
                        color={viewMode === 'characters' ? 'green' : 'default'}
                        onClick={() => onClick(viewModes.characters)}
                        className={viewMode === 'characters' ? 'selected' : ''}
                    >
                        Characters
                    </Button>
                    <Button
                        size="xs"
                        color={viewMode === 'overview' ? 'green' : 'default'}
                        onClick={() => onClick(viewModes.overview)}
                        className={viewMode === 'overview' ? 'selected' : ''}
                    >
                        Overview
                    </Button>
                </Button.Group>
            </MediaQuery>
        </>
    );
};

export default ViewModeControls;
