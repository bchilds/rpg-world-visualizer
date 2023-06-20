import { test, expect } from 'vitest';
import {
  generateCompressedString,
  loadDataFromCompressedString,
} from './data-loader';

const someData = {
    allFeatures: [
        {
            id: 1,
            name: 'Feature 1',
            description: 'Description 1',
        },
    ],
    allLocations: [
        {
            id: 1,
            name: 'Location 1',
            description: 'Description 1',
            features: [1],
            childLocations: [],
        },
    ],
};

test('can generate a compressed string', () => {
    const compressedString = generateCompressedString(someData);
    console.log(compressedString);
    expect(compressedString).toBeDefined();
});

test.each([
    'N4IghgNhAyD2DGYAuBLWA7AziAXAbVBQBNcBGAGhHTAFsBTXEORVDAAlJEqLs3gCcUAB1bpGAEV4DhojlxAAzOsgCu-XrjykAupXgALFBCLNkaLJu0BfXeCgAxZUjUb8hEjgpVaDHCEeq6nLcUoIi5hKhMuZyNlZAA',
])('can load data from known string', (compressedString) => {
    const data = loadDataFromCompressedString(compressedString);
    expect(data?.allFeatures.length).toBeGreaterThan(0);
    expect(data?.allLocations.length).toBeGreaterThan(0);
    expect(data?.allFeatures).toStrictEqual(someData.allFeatures);
    expect(data?.allLocations).toStrictEqual(someData.allLocations);
});
test('invalid string yields undefined, and so does not load anything', () => {
    const data = loadDataFromCompressedString('invalid string');
    expect(data).toBeUndefined();
});
