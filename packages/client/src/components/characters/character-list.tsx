import { Stack, Title } from '@mantine/core';
import { useGlobalContext } from '../../contexts/global.context';
import CharacterCard from './character-card';

const CharacterList = () => {
    const { allCharacters } = useGlobalContext();

    return (
        <Stack style={{ marginBottom: 'auto' }}>
            <Title order={3} style={{ justifySelf: 'flex-start' }}>
                Character List
            </Title>
            {allCharacters.map((character) => (
                <CharacterCard id={character.id} key={character.id} />
            ))}
        </Stack>
    );
};

export default CharacterList;
