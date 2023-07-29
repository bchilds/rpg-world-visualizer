import { Stack, Title } from '@mantine/core';
import { useGlobalContext } from '../../contexts/global.context';
import NodeCardComponent from '../node/node-card-component';

const CharacterList = () => {
    const { allCharacters, setAllCharacters } = useGlobalContext();

    const deleteCharacter = (id: number) => {
        const newCharacters = allCharacters.filter(
            (character) => character.id !== id
        );
        setAllCharacters(newCharacters);
    };
    return (
        <Stack style={{ marginBottom: 'auto' }}>
            <Title order={3} style={{ justifySelf: 'flex-start' }}>
                Character List
            </Title>
            {allCharacters.map((character) => (
                <NodeCardComponent key={character.id}>
                    {character.name}
                </NodeCardComponent>
            ))}
        </Stack>
    );
};

export default CharacterList;
