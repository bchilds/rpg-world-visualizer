import { Button, Group } from '@mantine/core';
import { OverviewToolMode } from '../../types/overvew.types';

import './overview-tools.css';

type OverviewToolsProps = {
    currentMode: OverviewToolMode;
    onClick: (mode: OverviewToolMode) => void;
};

const OverviewTools = ({ currentMode, onClick }: OverviewToolsProps) => {
    return (
        <Group className="overview-tools" spacing={'5px'}>
            <Button
                disabled={currentMode === 'select'}
                onClick={() => onClick('select')}
                className={currentMode === 'select' ? 'selected' : ''}
            >
                Select
            </Button>
            <Button
                disabled={currentMode === 'reassign'}
                onClick={() => onClick('reassign')}
                className={currentMode === 'reassign' ? 'selected' : ''}
            >
                Reassign
            </Button>
        </Group>
    );
};

export default OverviewTools;
