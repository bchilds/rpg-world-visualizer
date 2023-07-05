import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { LocationProvider } from './contexts/location.context';

export const AppWrappers = ({ children }: { children: React.ReactNode }) => {
    return (
        <MantineProvider theme={{
            colorScheme: 'dark',
        }} withNormalizeCSS>
            <Notifications position='top-right'/>
            <LocationProvider>{children}</LocationProvider>
        </MantineProvider>
    );
}