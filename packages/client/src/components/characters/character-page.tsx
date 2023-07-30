import { Group } from '@mantine/core';
import CharacterList from './character-list';
import NewCharacterForm from './new-character';

// TODO make this a toggle on mobile
const CharacterPage = () => {
    return (
        <Group position="center" grow>
            <NewCharacterForm />
            <CharacterList />
        </Group>
    );
};

export default CharacterPage;
