import { Fragment, useState } from 'react';
import Viewport from './components/viewport/viewport';
import Overview from './components/overview/overview';
import DataLoader from './components/data-loader/data-loader';
import Sidebar from './components/sidebar/sidebar';

import './App.css';
import { AppWrappers } from './app-wrappers';

const viewModes = {
    viewport: 'viewport',
    overview: 'overview',
} as const;
type ViewMode = keyof typeof viewModes;

function App() {
    const [viewMode, setViewMode] = useState<ViewMode>(viewModes.viewport);
    return (
        <div className="app">
            <AppWrappers>
                <Sidebar />
                <div className="content-container">
                    <DataLoader />
                    <p>
                        Add features to describe a location, or child locations.
                    </p>
                    <div className="view-mode-controls">
                        <button
                            onClick={() => setViewMode('viewport')}
                            className={
                                viewMode === 'viewport' ? 'selected' : ''
                            }
                        >
                            Viewport
                        </button>
                        <button
                            onClick={() => setViewMode('overview')}
                            className={
                                viewMode === 'overview' ? 'selected' : ''
                            }
                        >
                            Overview
                        </button>
                    </div>
                    <Fragment>
                        {viewMode === viewModes.viewport && <Viewport />}
                        {viewMode === viewModes.overview && (
                            <Overview
                                onNodeSelect={() =>
                                    setViewMode(viewModes.viewport)
                                }
                            />
                        )}
                    </Fragment>
                </div>
            </AppWrappers>
        </div>
    );
}

export default App;