import {
    Button,
    MantineTheme,
    MediaQuery,
    Paper,
    Space,
    Stack,
} from '@mantine/core';
import { ElementRef, forwardRef, useCallback } from 'react';
import DeleteX from '../delete-x/delete-x';

type NodeCardComponentProps = {
    onSelect?: () => void;
    onDelete?: () => void;
    canNavigate?: boolean;
    showHover?: boolean;
    children: React.ReactNode;
    cardType: string; // Location, Character, Feature...
};

// TODO create an "additional actions" section/prop to pass in other stuff
const NodeCardComponent = forwardRef<
    ElementRef<typeof Paper>,
    NodeCardComponentProps
>((props, ref) => {
    const { onSelect, onDelete, canNavigate, showHover, children } = props;
    const _showHover = canNavigate || showHover;
    const _onSelect = useCallback(() => {
        if (onSelect) {
            onSelect();
        }
    }, [onSelect]);

    return (
        <Paper
            ref={ref}
            withBorder
            shadow="xs"
            radius="md"
            p="md"
            onClick={_onSelect}
            style={{
                cursor: !_showHover ? 'default' : 'pointer',
            }}
            sx={(theme: MantineTheme) => ({
                '&:hover': {
                    borderColor: _showHover ? theme.colors.green[8] : '',
                },
            })}
        >
            <Stack>
                {(canNavigate || onDelete) && (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        {canNavigate && (
                            <>
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
                            </>
                        )}
                        {onDelete && (
                            <DeleteX
                                title={`Delete ${props.cardType}`}
                                onDelete={onDelete}
                                style={{ marginLeft: 'auto' }}
                            />
                        )}
                    </div>
                )}
                {children}
            </Stack>
        </Paper>
    );
});

export default NodeCardComponent;
