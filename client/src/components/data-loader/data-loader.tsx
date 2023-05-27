import { useState } from 'react';
import { useLocationContext } from '../../contexts/location.context';
import { generateCompressedString } from '../../services/data-loader';

const DataLoader = () => {
    const { allLocations, allFeatures, loadWorldFromCompressedString } =
        useLocationContext();
    const [compressedString, setCompressedString] = useState<string>('');

    const onGenerate = () => {
        const compressedData = generateCompressedString({
            allLocations,
            allFeatures,
        });
        setCompressedString(compressedData);
    };

    const onLoad = () => {
        loadWorldFromCompressedString(compressedString);
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
