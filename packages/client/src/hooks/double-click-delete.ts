import { useClickOutside, useToggle } from '@mantine/hooks';
import { useCallback } from 'react';

export const useOnConfirmClick = (onConfirmClick: () => void) => {
    const [confirm, toggleConfirm] = useToggle([false, true]); // defaults to false
    const closeButtonRef = useClickOutside(() => {
        if (confirm) {
            toggleConfirm();
        }
    });
    const onDoubleClick = useCallback(
        (e: React.SyntheticEvent) => {
            e.stopPropagation();
            if (!confirm) {
                return toggleConfirm();
            }
            if (onConfirmClick) {
                onConfirmClick();
            }
        },
        [confirm, onConfirmClick]
    );

    return { confirm, closeButtonRef, onDoubleClick };
};
