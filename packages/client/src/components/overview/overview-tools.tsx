import { Button, Group, MantineTheme } from '@mantine/core';
import { OverviewToolMode } from '../../types/overvew.types';

type OverviewToolsProps = {
    currentMode: OverviewToolMode;
    onClick: (mode: OverviewToolMode) => void;
};

const sx = (theme: MantineTheme) => ({
    '&[data-disabled]': {
        background: theme.colors.green[8],
        color: 'white',
        cursor: 'default',
    },
});

const OverviewTools = ({ currentMode, onClick }: OverviewToolsProps) => {
    return (
        <Group
            spacing={'5px'}
            style={{
                position: 'absolute',
                padding: '10px',
                right: '0',
                background: '#777',
            }}
        >
            <Button
                color={currentMode === 'select' ? 'green' : 'default'}
                disabled={currentMode === 'select'}
                onClick={() => onClick('select')}
                sx={sx}
            >
                Select
            </Button>
            <Button
                color={currentMode === 'reassign' ? 'green' : 'default'}
                disabled={currentMode === 'reassign'}
                onClick={() => onClick('reassign')}
            >
                Reassign
            </Button>
        </Group>
    );
};

export default OverviewTools;
