import { Fragment, useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    Footer, Text,
    MediaQuery,
    Burger,
    useMantineTheme
} from '@mantine/core';

import './App.css';
import { AppWrappers } from './app-wrappers';
import DataLoader from './components/data-loader/data-loader';
import Overview from './components/overview/overview';
import Viewport from './components/viewport/viewport';

const viewModes = {
    viewport: 'viewport',
    overview: 'overview',
} as const;
type ViewMode = keyof typeof viewModes;

function App() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>(viewModes.viewport);

    return (
        <div className="app">
            <AppWrappers>
                <AppShell
                    styles={{
                        main: {
                            background:
                                theme.colorScheme === 'dark'
                                    ? theme.colors.dark[8]
                                    : theme.colors.gray[0],
                        },
                    }}
                    navbarOffsetBreakpoint="sm"
                    asideOffsetBreakpoint="sm"
                    navbar={
                        <Navbar
                            p="md"
                            hiddenBreakpoint="sm"
                            hidden={!opened}
                            width={{ sm: 200, lg: 300 }}
                        >
                            <Text>Application navbar</Text>
                        </Navbar>
                    }
                    // aside={
                    //     <MediaQuery
                    //         smallerThan="sm"
                    //         styles={{ display: 'none' }}
                    //     >
                    //         <Aside
                    //             p="md"
                    //             hiddenBreakpoint="sm"
                    //             width={{ sm: 200, lg: 300 }}
                    //         >
                    //             <Text>Application sidebar</Text>
                    //         </Aside>
                    //     </MediaQuery>
                    // }
                    footer={
                        <Footer height={60} p="md">
                            Application footer
                        </Footer>
                    }
                    header={
                        <Header height={{ base: 50, md: 70 }} p="md">
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '100%',
                                }}
                            >
                                <MediaQuery
                                    largerThan="sm"
                                    styles={{ display: 'none' }}
                                >
                                    <Burger
                                        opened={opened}
                                        onClick={() => setOpened((o) => !o)}
                                        size="sm"
                                        color={theme.colors.gray[6]}
                                        mr="xl"
                                    />
                                </MediaQuery>

                                <Text>Application header</Text>
                            </div>
                        </Header>
                    }
                >
                    <div className="content-container">
                        <DataLoader />
                        <p>
                            Add features to describe a location, or child
                            locations.
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
                </AppShell>
                {/* <Sidebar /> */}
            </AppWrappers>
        </div>
    );
}

export default App;
