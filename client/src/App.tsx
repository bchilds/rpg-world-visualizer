import { LocationProvider } from './contexts/location.context';
import Viewport from './components/viewport/viewport';
import Overview from './components/overview/overview';
import { Fragment, useState } from 'react';

import './App.css';

const viewModes = {
    viewport: 'viewport',
    overview: 'overview',
} as const;
type ViewMode = keyof typeof viewModes;

function App() {
    const [viewMode, setViewMode] = useState<ViewMode>(viewModes.viewport);
    return (
        <div className="app">
            <div className="view-mode-controls">
                <button onClick={() => setViewMode('viewport')}>
                    Viewport
                </button>
                <button onClick={() => setViewMode('overview')}>
                    Overview
                </button>
            </div>
            <LocationProvider>
                <Fragment>
                    {viewMode === viewModes.viewport && <Viewport />}
                    {viewMode === 'overview' && (
                        <Overview
                            onNodeClick={() => setViewMode(viewModes.viewport)}
                        />
                    )}
                </Fragment>
            </LocationProvider>
        </div>
    );
}

export default App;
