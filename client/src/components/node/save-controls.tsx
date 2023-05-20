import './node.css';

type SaveControlProps = {
    onSave: () => void;
    onCancel: () => void;
};

const SaveControls = ({ onSave, onCancel }: SaveControlProps) => {
    return (
        <div className="save-controls">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    console.log('save');
                    onSave();
                }}
            >
                Save
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    console.log('cancel');
                    onCancel();
                }}
            >
                Cancel
            </button>
        </div>
    );
};

export default SaveControls;
