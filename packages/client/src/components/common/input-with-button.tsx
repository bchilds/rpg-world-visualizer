import { Button, TextInput } from "@mantine/core";
import React, { ComponentProps } from "react";

type InputWithButtonProps = {
  buttonText: string;
  loading?: boolean;
  onButtonClick: React.MouseEventHandler<HTMLButtonElement>;
} & ComponentProps<typeof TextInput> &
  ComponentProps<typeof Button>;

const InputWithButton = ({
  buttonText,
  onButtonClick,
  value,
  onChange,
  label,
  placeholder,
  onKeyDown,
  error,
  rightSectionWidth,
  loading = false,
  variant,
  color,
  radius,
}: InputWithButtonProps) => {
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
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
          display: "flex",
        },
        rightSection: {
          width: "auto",
          position: "relative",
        },
      }}
      error={error}
      onKeyDown={onKeyDown}
      rightSectionWidth={rightSectionWidth}
    />
  );
};

export default InputWithButton;