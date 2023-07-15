import { useLocationContext } from '../../contexts/location.context';
import { generateCompressedString } from '../../services/data-loader';
import { useCopyToClipboard } from '../../hooks/use-copy-to-clipboard';
import { createNotification } from '../notifications/notification-manager';
import { COLORS } from '../../styles/colors';
import { Button } from '@mantine/core';

const COPY_TEXT = 'Copy World URL';
const COPY_MESSAGE = 'Copied world URL to clipboard!';

const DataLoader = () => {
    const { allLocations, allFeatures } = useLocationContext();
    const [_copiedText, copy] = useCopyToClipboard();

    const onGenerate = () => {
        const compressedData = generateCompressedString({
            allLocations,
            allFeatures,
        });
        const worldUrl = `${window.location.origin}#${compressedData}`;
        copy(worldUrl);
        createNotification({
            message: COPY_MESSAGE,
            color: 'gray',
            autoClose: 2000,
            withCloseButton: true,
            styles: {
                root: {
                    backgroundColor: COLORS.lightBackground,

                    '&[data-with-border]': {
                        border: `3px solid ${COLORS.borderGray}`,
                    },
                },
                description: {
                    padding: '0.5rem',
                    color: COLORS.fontColor,
                    fontSize: '1rem',
                },
                closeButton: {
                    color: COLORS.fontColor,
                },
            },
        });
    };

    return <Button onClick={onGenerate}>{COPY_TEXT}</Button>;
};

export default DataLoader;
