import { useContext } from 'react';
import { LocationContext } from '../../contexts/location.context';

import './sidebar.css';

const Sidebar = () => {
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
        <div className="sidebar-container">
            <h3>Saved Worlds</h3>
            <button onClick={createNewWorld}>Create New World</button>
            <ul>
                {worldNames.map((name) => {
                    return (
                        <li
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
        </div>
    );
};

export default Sidebar;
