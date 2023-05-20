import Viewport from './components/viewport/viewport';

import './App.css';
import { LocationProvider } from './contexts/location.context';

function App() {
    return (
        <div className="app">
            <LocationProvider>
                <Viewport />
            </LocationProvider>
        </div>
    );
}

export default App;
