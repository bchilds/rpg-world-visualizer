import {
    Button, MantineTheme,
    MediaQuery,
    Paper,
    Space,
    Stack
} from '@mantine/core';
import { useCallback } from 'react';
import DeleteX from '../delete-x/delete-x';

type NodeCardComponentProps = {
    onSelect?: () => void;
    onDelete?: () => void;
    canNavigate?: boolean;
    children: React.ReactNode;
};

const NodeCardComponent = ({
    onSelect,
    onDelete,
    canNavigate = false,
    children,
}: NodeCardComponentProps) => {
    const _onSelect = useCallback(() => {
        if (onSelect) {
            onSelect();
        }
    }, [onSelect]);

    return (
        <Paper
            withBorder
            shadow="xs"
            radius="md"
            p="md"
            onClick={_onSelect}
            style={{
                cursor: !canNavigate ? 'default' : 'pointer',
            }}
            sx={(theme: MantineTheme) => ({
                '&:hover': {
                    borderColor: canNavigate ? theme.colors.green[8] : '',
                },
            })}
        >
            <Stack>
                {canNavigate && (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <MediaQuery
                            largerThan={'sm'}
                            styles={{
                                display: 'none',
                            }}
                        >
                            <Button size="xs" onClick={_onSelect}>
                                Select
                            </Button>
                        </MediaQuery>
                        <MediaQuery
                            smallerThan={'sm'}
                            styles={{ display: 'none' }}
                        >
                            <Space />
                        </MediaQuery>
                        {onDelete && <DeleteX onDelete={onDelete} />}
                    </div>
                )}
                {children}
            </Stack>
        </Paper>
    );
};

export default NodeCardComponent;
