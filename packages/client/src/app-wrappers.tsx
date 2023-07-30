import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { GlobalProvider } from './contexts/global.context';

export const AppWrappers = ({ children }: { children: React.ReactNode }) => {
    return (
        <MantineProvider
            theme={{
                colorScheme: 'dark',
                primaryColor: 'gray',
            }}
            withNormalizeCSS
        >
            <Notifications position="top-right" />
            <GlobalProvider>{children}</GlobalProvider>
        </MantineProvider>
    );
};
