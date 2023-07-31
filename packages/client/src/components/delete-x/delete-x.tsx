import { CloseButton } from '@mantine/core';
import { useOnConfirmClick } from '../../hooks/double-click-delete';
import { noop } from '../../utils/noop';
import React from 'react';

const DeleteX = ({
    onDelete,
    style,
    title = 'Delete Location',
}: {
    title?: string;
    onDelete: () => void;
    style?: React.CSSProperties;
}) => {
    const { confirm, closeButtonRef, onDoubleClick } = useOnConfirmClick(
        onDelete ?? noop
    );

    return (
        <CloseButton
            title={title}
            onClick={onDoubleClick}
            color={confirm ? 'red' : 'default'}
            ref={closeButtonRef}
            size={confirm ? 'md' : 'sm'}
            style={style}
        />
    );
};

export default DeleteX;
