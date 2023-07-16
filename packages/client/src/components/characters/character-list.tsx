import { Stack, Title } from '@mantine/core';
import { useLocationContext } from '../../contexts/location.context';
import NodeCardComponent from '../node/node-card-component';

const CharacterList = () => {
    const { allCharacters } = useLocationContext();
    return (
        <Stack>
            <Title order={3}>Character List</Title>
            {allCharacters.map((character) => (
                <NodeCardComponent key={character.id}>
                    {character.name}
                </NodeCardComponent>
            ))}
        </Stack>
    );
};

export default CharacterList;
