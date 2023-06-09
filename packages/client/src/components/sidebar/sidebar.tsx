import { useContext } from 'react';
import { LocationContext } from '../../contexts/location.context';
import { Button, Navbar, Title } from '@mantine/core';

import './sidebar.css';

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
    } = useContext(LocationContext);
    const currentWorldName = getLocationById(0).name;
    const worldNames = Object.keys(worlds);

    const _onClick = (targetWorldCompressedString: string) => {
        if (
            // don't bother loading if we're already on the target world
            worlds[currentWorldName]?.worldTreeCompressed ===
            targetWorldCompressedString
        ) {
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
            className="sidebar-container"
        >
            <Title order={2} size="h3">
                Saved Worlds
            </Title>
            <Button
                mt={'sm'}
                onClick={createNewWorld}
                styles={{
                    root: {
                        textSizeAdjust: 'auto',
                    },
                }}
            >
                New World
            </Button>
            <ul>
                {worldNames.map((name) => {
                    return (
                        <li
                            className={
                                currentWorldName === name ? 'selected' : ''
                            }
                            key={name}
                            onClick={() => {
                                _onClick(worlds[name].worldTreeCompressed);
                            }}
                        >
                            {name}
                        </li>
                    );
                })}
            </ul>
        </Navbar>
    );
};

export default Sidebar;
