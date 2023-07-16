import { CloseButton, Paper, Stack } from '@mantine/core';
import { useToggle, useClickOutside } from '@mantine/hooks';
import { useCallback } from 'react';

type NodeCardComponentProps = {
    onSelect?: () => void;
    onDelete?: () => void;
    isCurrentLocation?: boolean;
    children: React.ReactNode;
};

const NodeCardComponent = ({
    onSelect,
    onDelete,
    isCurrentLocation = false,
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
        <Paper withBorder shadow="xs" radius="md" p="md" onClick={_onSelect}>
            <Stack
                style={{
                    cursor: isCurrentLocation ? 'default' : 'pointer',
                }}
            >
                {onDelete && (
                    <CloseButton
                        title="Delete Location"
                        onClick={_onCloseClick}
                        style={{
                            alignSelf: 'flex-end',
                        }}
                        color={confirm ? 'red' : 'default'}
                        ref={closeButtonRef}
                        size={confirm ? 'md' : 'sm'}
                    />
                )}
                {children}
            </Stack>
        </Paper>
    );
};

export default NodeCardComponent;
