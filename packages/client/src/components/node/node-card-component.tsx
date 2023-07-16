import {
    Button,
    CloseButton,
    MantineTheme,
    MediaQuery,
    Paper,
    Space,
    Stack,
} from '@mantine/core';
import { useToggle, useClickOutside } from '@mantine/hooks';
import { useCallback } from 'react';

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
    const [confirm, toggleConfirm] = useToggle([false, true]); // defaults to false I think
    const closeButtonRef = useClickOutside(() => {
        if (confirm) {
            toggleConfirm();
        }
    });

    const _onSelect = useCallback(() => {
        if (onSelect) {
            onSelect();
        }
    }, [onSelect]);

    const _onCloseClick = useCallback(
        (e: React.SyntheticEvent) => {
            e.stopPropagation();
            if (!confirm) {
                return toggleConfirm();
            }
            if (onDelete) {
                onDelete();
            }
        },
        [confirm, onDelete]
    );
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
                        {onDelete && (
                            <CloseButton
                                title="Delete Location"
                                onClick={_onCloseClick}
                                color={confirm ? 'red' : 'default'}
                                ref={closeButtonRef}
                                size={confirm ? 'md' : 'sm'}
                            />
                        )}
                    </div>
                )}
                {children}
            </Stack>
        </Paper>
    );
};

export default NodeCardComponent;
