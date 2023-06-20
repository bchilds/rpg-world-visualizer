import { useState } from 'react';
import { useLocationContext } from '../../contexts/location.context';
import { generateCompressedString } from '../../services/data-loader';
import { useCopyToClipboard } from '../../hooks/use-copy-to-clipboard';

const DataLoader = () => {
    const { allLocations, allFeatures } = useLocationContext();
    const [_copiedText, copy] = useCopyToClipboard();
    const [buttonText, setButtonText] = useState<string>('Copy World URL');

    const onGenerate = () => {
        const compressedData = generateCompressedString({
            allLocations,
            allFeatures,
        });
        const worldUrl = `${window.location.origin}#${compressedData}`;
        copy(worldUrl);
        setButtonText('Copied!');
        setTimeout(() => {
            // TODO async safe
            setButtonText('Copy World URL');
        }
        , 2000);
    };

    return (
        <div className="data-load-controls">
            <button onClick={onGenerate}>{buttonText}</button>
        </div>
    );
};

export default DataLoader;
