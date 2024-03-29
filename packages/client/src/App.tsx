import { useCallback, useState } from 'react';
import {
    AppShell,
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
import Sidebar from './components/sidebar/sidebar';
import { ViewMode, viewModes } from './types/view-modes.types';
import ViewModeControls from './components/view-mode-controls/view-mode-controls';
import './App.css';
import CharacterPage from './components/characters/character-page';
import { useLocalStorage } from '@mantine/hooks';

function App() {
    const theme = useMantineTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [viewMode, setViewMode] = useLocalStorage<ViewMode>({
        // annoyingly, this is undefined on the first render.
        key: 'view-mode',
        defaultValue: viewModes.viewport,
    });
    const hideSidebar = useCallback(() => setIsSidebarOpen(false), []);
    const toggleSidebar = useCallback(() => setIsSidebarOpen((o) => !o), []);

    return (
        <AppWrappers>
            <AppShell
                navbarOffsetBreakpoint="sm"
                navbar={
                    <Sidebar opened={isSidebarOpen} hideSidebar={hideSidebar} />
                }
                footer={
                    <Footer height="60">
                        <Flex
                            justify="center"
                            align="center"
                            style={{ height: '100%' }}
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
                                    opened={isSidebarOpen}
                                    onClick={toggleSidebar}
                                    size="sm"
                                    color={theme.colors.gray[6]}
                                    mr="sm"
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
                styles={{
                    main: { overflowX: 'hidden' },
                }}
            >
                <div className="content-container">
                    {viewMode === viewModes.viewport && <Viewport />}
                    {viewMode === viewModes.characters && <CharacterPage />}
                    {viewMode === viewModes.overview && (
                        <Overview
                            onNodeSelect={() => setViewMode(viewModes.viewport)}
                        />
                    )}
                </div>
            </AppShell>
        </AppWrappers>
    );
}

export default App;
