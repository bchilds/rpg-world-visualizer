import { Fragment, useState } from 'react';
import { LocationProvider } from './contexts/location.context';
import Viewport from './components/viewport/viewport';
import Overview from './components/overview/overview';
import DataLoader from './components/data-loader/data-loader';
import Sidebar from './components/sidebar/sidebar';

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
            <LocationProvider>
                <Sidebar />
                <div className="content-container">
                    <DataLoader />
                    <p>
                        Add features to describe a location, or child locations.
                        Click generate to get a compressed string for your data.
                        Paste it in and hit Load to load in said string.
                    </p>
                    <div className="view-mode-controls">
                        <button onClick={() => setViewMode('viewport')}>
                            Viewport
                        </button>
                        <button onClick={() => setViewMode('overview')}>
                            Overview
                        </button>
                    </div>
                    <Fragment>
                        {viewMode === viewModes.viewport && <Viewport />}
                        {viewMode === 'overview' && (
                            <Overview
                                onNodeClick={() =>
                                    setViewMode(viewModes.viewport)
                                }
                            />
                        )}
                    </Fragment>
                </div>
            </LocationProvider>
        </div>
    );
}

export default App;
