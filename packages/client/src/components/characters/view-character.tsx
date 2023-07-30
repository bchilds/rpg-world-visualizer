import { Text } from '@mantine/core';
import { Character } from '../../types/character.types';
import { useGlobalContext } from '../../contexts/global.context';
import { useMemo } from 'react';

const ViewCharacter = ({ id }: { id: Character['id'] }) => {
    const { allCharacters, allLocations } = useGlobalContext();
    const character = useMemo(
        () => allCharacters.find((character) => character.id === id),
        [allCharacters, id]
    );
    if (!character) {
        throw new Error(`Character with id ${id} not found`);
    }

    const characterLocations = useMemo(
        () =>
            allLocations.filter((location) =>
                character.locations.includes(location.id)
            ),
        [allLocations, character]
    );

    return (
        <>
            <Text fw={700}>
                Character Name: <Text fw={400}>{character.name}</Text>
            </Text>
            {character.description && (
                <Text fw={700}>
                    Description: <Text fw={400}>{character.description}</Text>
                </Text>
            )}
            {characterLocations.length > 0 && (
                <Text fw={700}>
                    Locations:
                    {characterLocations.map((location) => (
                        <Text fw={400}>{location.name}</Text>
                    ))}
                </Text>
            )}
        </>
    );
};

export default ViewCharacter;
