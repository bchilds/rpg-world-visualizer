import { OverviewToolMode } from '../../types/overvew.types';

import './overview-tools.css';

type OverviewToolsProps = {
    currentMode: OverviewToolMode;
    onClick: (mode: OverviewToolMode) => void;
};

const OverviewTools = ({ currentMode, onClick }: OverviewToolsProps) => {
    return (
        <div className="overview-tools">
            <button
                disabled={currentMode === 'select'}
                onClick={() => onClick('select')}
                className={currentMode === 'select' ? 'selected' : ''}
            >
                Select
            </button>
            <button
                disabled={currentMode === 'reassign'}
                onClick={() => onClick('reassign')}
                className={currentMode === 'reassign' ? 'selected' : ''}
            >
                Reassign
            </button>
        </div>
    );
};

export default OverviewTools;
