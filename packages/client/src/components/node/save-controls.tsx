import { Button, Group } from '@mantine/core';

type SaveControlProps = {
    onSave: () => void;
    onCancel: () => void;
};

const SaveControls = ({ onSave, onCancel }: SaveControlProps) => {
    return (
        <Group position="center">
            <Button
                color="green"
                onClick={(e) => {
                    e.stopPropagation();
                    onSave();
                }}
            >
                Save
            </Button>
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    onCancel();
                }}
            >
                Cancel
            </Button>
        </Group>
    );
};

export default SaveControls;
