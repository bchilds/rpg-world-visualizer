export type LocalStorageWorldsMap = {
    [worldName: string]: LocalStorageWorldData;
};

export type LocalStorageWorldData = {
    name: string;
    worldTreeCompressed: string;
};
