import { useState } from 'react';
import LZString from 'lz-string';
import { useLocationContext } from '../../contexts/location.context';

const DataLoader = () => {
    const { allLocations, setAllLocations, allFeatures, setAllFeatures } =
        useLocationContext();
    const [compressedString, setCompressedString] = useState<string>('');

    const onGenerate = () => {
        const compressedData = LZString.compressToEncodedURIComponent(
            JSON.stringify({ allLocations, allFeatures })
        );
        setCompressedString(compressedData);
    };

    const onLoad = () => {
        const decompressedData =
            LZString.decompressFromEncodedURIComponent(compressedString);
        if (!decompressedData) return;

        const { allLocations: newAllLocations, allFeatures: newAllFeatures } =
            JSON.parse(decompressedData);
        setAllLocations(newAllLocations);
        setAllFeatures(newAllFeatures);
        setCompressedString('');
    };

    return (
        <div className="data-load-controls">
            <input
                type="text"
                value={compressedString}
                onChange={(e) => setCompressedString(e.target.value)}
            />
            <button onClick={onGenerate}>Generate</button>
            <button onClick={onLoad}>Load</button>
        </div>
    );
};

export default DataLoader;
