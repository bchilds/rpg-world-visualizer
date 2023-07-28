import { Stack, Title } from '@mantine/core';
import { useLocationContext } from '../../contexts/location.context';
import NodeCardComponent from '../node/node-card-component';

const CharacterList = () => {
    const { allCharacters } = useLocationContext();
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
