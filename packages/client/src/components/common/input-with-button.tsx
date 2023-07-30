import { Button, TextInput } from '@mantine/core';
import React, { ComponentProps } from 'react';

type InputWithButtonProps = {
    buttonText: string;
    loading?: boolean;
    onButtonClick: React.MouseEventHandler<HTMLButtonElement>;
} & ComponentProps<typeof TextInput> &
    ComponentProps<typeof Button>;

const InputWithButton = ({
    buttonText,
    onButtonClick,
    loading = false,
    styles,
    color,
    radius,
    variant,
    ...rest
}: InputWithButtonProps) => {
    return (
        <TextInput
            rightSection={
                <Button
                    loading={loading}
                    onClick={onButtonClick}
                    variant={variant}
                    color={color}
                    radius={radius}
                >
                    {buttonText}
                </Button>
            }
            styles={{
                wrapper: {
                    display: 'flex',
                },
                rightSection: {
                    width: 'auto',
                    position: 'relative',
                },
                ...styles,
            }}
            {...rest}
        />
    );
};

export default InputWithButton;
