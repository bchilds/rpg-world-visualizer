import { useContext } from 'react';
import { LocationContext } from '../../contexts/location.context';
import { Button, Navbar, Stack, Title } from '@mantine/core';

type SidebarProps = {
    opened: boolean;
    hideSidebar: () => void;
};

const Sidebar = ({ opened, hideSidebar }: SidebarProps) => {
    const {
        worlds,
        getLocationById,
        loadWorldFromCompressedString,
        createNewWorld,
        setCurrentLocationId,
    } = useContext(LocationContext);
    const currentWorldName = getLocationById(0).name;
    const worldNames = Object.keys(worlds);

    const _onClick = (targetWorldCompressedString: string) => {
        // don't bother loading if we're already on the target world
        const alreadySelected =
            worlds[currentWorldName]?.worldTreeCompressed ===
            targetWorldCompressedString;
        if (alreadySelected) {
            setCurrentLocationId(0);
            hideSidebar();
            return;
        }
        console.log('LOADING WORLD: ', targetWorldCompressedString);
        loadWorldFromCompressedString(targetWorldCompressedString);
        hideSidebar();
    };
    return (
        <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 150, md: 255, lg: 300 }}
        >
            <Title order={2} size="h3">
                Saved Worlds
            </Title>
            <Stack spacing={'sm'}>
                <Button mt={'sm'} mb={'sm'} onClick={createNewWorld}>
                    New World
                </Button>
                {worldNames.map((name) => {
                    return (
                        <Button
                            color={
                                currentWorldName === name ? 'green' : 'default'
                            }
                            key={name}
                            onClick={() => {
                                _onClick(worlds[name].worldTreeCompressed);
                            }}
                        >
                            {name}
                        </Button>
                    );
                })}
            </Stack>
        </Navbar>
    );
};

export default Sidebar;
