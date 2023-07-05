import { Fragment, useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    Footer,
    MediaQuery,
    Burger,
    useMantineTheme,
    Title,
    Flex,
} from '@mantine/core';

import { AppWrappers } from './app-wrappers';
import DataLoader from './components/data-loader/data-loader';
import Overview from './components/overview/overview';
import Viewport from './components/viewport/viewport';
import './App.css';
import Sidebar from './components/sidebar/sidebar';
import { ViewMode, viewModes } from './types/view-modes.types';
import ViewModeControls from './components/view-mode-controls/view-mode-controls';

function App() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>(viewModes.viewport);

    return (
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
                        <Sidebar />
                    </Navbar>
                }
                footer={
                    <Footer height="60">
                        <Flex
                            justify="center"
                            align="center"
                            styles={{ height: '100%' }}
                        >
                            <DataLoader />
                        </Flex>
                    </Footer>
                }
                header={
                    <Header height={{ base: 50, md: 70 }} p="md">
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
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
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <MediaQuery
                                    smallerThan="sm"
                                    styles={{ display: 'none' }}
                                >
                                    <Title
                                        size={'h3'}
                                        styles={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        RPG World Visualizer
                                    </Title>
                                </MediaQuery>
                                <MediaQuery
                                    largerThan="sm"
                                    styles={{ display: 'none' }}
                                >
                                    <Title
                                        size={'h6'}
                                        styles={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        RPG World Visualizer
                                    </Title>
                                </MediaQuery>
                                <ViewModeControls
                                    onClick={setViewMode}
                                    viewMode={viewMode}
                                />
                            </div>
                        </div>
                    </Header>
                }
            >
                <div className="content-container">
                    <p>
                        Add features to describe a location, or child locations.
                    </p>

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
        </AppWrappers>
    );
}

export default App;
