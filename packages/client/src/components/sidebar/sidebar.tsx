import { useContext } from 'react';
import { LocationContext } from '../../contexts/location.context';
import { Navbar, Title } from '@mantine/core';

import './sidebar.css';

type SidebarProps = {
    opened: boolean;
};

const Sidebar = ({ opened }: SidebarProps) => {
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
            <button onClick={createNewWorld}>New World</button>
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
