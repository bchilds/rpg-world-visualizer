import {
    NotificationProps as MantineNotificationProps,
    notifications,
} from '@mantine/notifications';

type NotificationProps = {
    title?: MantineNotificationProps['title'];
    message: MantineNotificationProps['message'];
    withCloseButton?: MantineNotificationProps['withCloseButton'];
    autoClose?: MantineNotificationProps['autoClose'];
    radius?: MantineNotificationProps['radius'];
    color: MantineNotificationProps['color'];
    withBorder?: MantineNotificationProps['withBorder'];
    styles?: MantineNotificationProps['styles'];
};

// ideas:
// - create unique ID if none provided and return it for future management
export const createNotification = ({
    title,
    message,
    color,
    radius,
    withCloseButton = false,
    autoClose = 2000,
    withBorder = true,
    styles,
}: NotificationProps) =>
    notifications.show({
        title,
        message,
        color,
        radius,
        autoClose,
        withCloseButton,
        withBorder,
        styles,
    });
