const CURRENT_WORLD_KEY = 'currentWorld';
const WORLDS_KEY = 'worlds';

if (!localStorage.getItem(WORLDS_KEY)) {
    localStorage.setItem(WORLDS_KEY, JSON.stringify({}));
}

export const setCurrentWorld = (worldName: string) => {
    localStorage.setItem(CURRENT_WORLD_KEY, worldName);
};

export const getCurrentWorld = () => {
    return localStorage.getItem(CURRENT_WORLD_KEY);
};

export const getWorlds = () => {
    return JSON.parse(localStorage.getItem(WORLDS_KEY) ?? '{}');
};

export const addOrUpdateWorld = (worldName: string, worldTreeCompressed: string) => {
    const worlds = getWorlds();
    worlds[worldName] = worldTreeCompressed;
    localStorage.setItem(WORLDS_KEY, JSON.stringify(worlds));
}

export const removeWorld = (worldName: string) => {
    const worlds = getWorlds();
    delete worlds[worldName];
    localStorage.setItem(WORLDS_KEY, JSON.stringify(worlds));
}

export const getCompressedWorldByName = (worldName: string) => {
    const worlds = getWorlds();
    return worlds[worldName];
}