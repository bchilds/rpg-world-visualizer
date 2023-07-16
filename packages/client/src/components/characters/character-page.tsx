import { Group } from '@mantine/core';
import CharacterList from './character-list';
import NewCharacterForm from './new-character-form';

// TODO make this a toggle on mobile
const CharacterPage = () => {
    return (
        <Group position='center' grow>
            <NewCharacterForm />
            <CharacterList />
        </Group>
    );
};

export default CharacterPage;
