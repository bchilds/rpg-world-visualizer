import LZString from 'lz-string';
import { Feature, WorldLocation } from '../types/location.types';
import { Character } from '../types/character.types';

export const loadDataFromCompressedString = (compressedString: string) => {
    const decompressedData =
        LZString.decompressFromEncodedURIComponent(compressedString);
    if (!decompressedData) return;

    const {
        allLocations = [],
        allFeatures = [],
        allCharacters = [],
    }: {
        allLocations: WorldLocation[];
        allFeatures: Feature[];
        allCharacters: Character[];
    } = JSON.parse(decompressedData);

    return { allLocations, allFeatures, allCharacters };
};

export const generateCompressedString = ({
    allLocations,
    allFeatures,
    allCharacters,
}: {
    allLocations: WorldLocation[];
    allFeatures: Feature[];
    allCharacters: Character[];
}) => {
    const compressedString = LZString.compressToEncodedURIComponent(
        JSON.stringify({ allLocations, allFeatures, allCharacters })
    );

    return compressedString;
};
