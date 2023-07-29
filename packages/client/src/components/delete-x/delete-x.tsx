import { CloseButton } from '@mantine/core';
import { useOnConfirmClick } from '../../hooks/double-click-delete';
import { noop } from '../../utils/noop';

const DeleteX = ({ onDelete }: { onDelete: () => void }) => {
    const { confirm, closeButtonRef, onDoubleClick } = useOnConfirmClick(
        onDelete ?? noop
    );

    return (
        <CloseButton
            title="Delete Location"
            onClick={onDoubleClick}
            color={confirm ? 'red' : 'default'}
            ref={closeButtonRef}
            size={confirm ? 'md' : 'sm'}
        />
    );
};

export default DeleteX;
