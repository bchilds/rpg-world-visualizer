import LZString from 'lz-string';
import { Feature, WorldLocation } from '../types/location.types';

export const loadDataFromCompressedString = (compressedString: string) => {
    const decompressedData =
        LZString.decompressFromEncodedURIComponent(compressedString);
    if (!decompressedData) return;

    const {
        allLocations = [],
        allFeatures = [],
    }: {
        allLocations: WorldLocation[];
        allFeatures: Feature[];
    } = JSON.parse(decompressedData);

    return { allLocations, allFeatures };
};

export const generateCompressedString = ({
    allLocations,
    allFeatures,
}: {
    allLocations: WorldLocation[];
    allFeatures: Feature[];
}) => {
    const compressedString = LZString.compressToEncodedURIComponent(
        JSON.stringify({ allLocations, allFeatures })
    );

    return compressedString;
};
