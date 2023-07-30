import { useCallback } from 'react';
import { useGlobalContext } from '../../contexts/global.context';
import { Character } from '../../types/character.types';
import NodeCardComponent from '../node/node-card-component';
import EditCharacter, { OnCharacterSubmit } from './edit-character';
import { useClickOutside, useToggle } from '@mantine/hooks';
import ViewCharacter from './view-character';
import { WorldLocation } from '../../types/location.types';

const CharacterCard = ({
    id,
    currentLocationId,
}: {
    id: Character['id'];
    currentLocationId?: WorldLocation['id'];
}) => {
    const [isEdit, toggleEdit] = useToggle();
    const ref = useClickOutside(() => toggleEdit(false));

    const { allCharacters, setAllCharacters, updateCharacter } =
        useGlobalContext();
    const character = allCharacters.find((character) => character.id === id);

    if (!character) {
        throw new Error(`Character with id ${id} not found`);
    }

    const deleteCharacter = useCallback(
        (id: number) => {
            const newCharacters = allCharacters.filter(
                (character) => character.id !== id
            );
            setAllCharacters(newCharacters);
        },
        [setAllCharacters, allCharacters]
    );

    const _onUpdateCharacter = useCallback<OnCharacterSubmit>(
        (values, _form) => {
            const newLocationNotes = {
                ...character.locationNotes,
                ...(values.locationNotes as { [key: number]: string }),
            };

            const newCharacter = {
                ...character,
                ...values,
                locations: values.locations.map(Number),
                locationNotes: newLocationNotes,
            };
            updateCharacter(newCharacter);
            toggleEdit(false);
        },
        [character, updateCharacter, toggleEdit]
    );

    // TODO mobile sizing
    return (
        <NodeCardComponent
            ref={ref}
            onDelete={() => deleteCharacter(id)}
            onSelect={() => toggleEdit(true)}
            showHover
        >
            {isEdit && (
                <EditCharacter
                    id={id}
                    onSubmit={_onUpdateCharacter}
                    currentLocationId={currentLocationId}
                />
            )}
            {!isEdit && (
                <ViewCharacter id={id} currentLocationId={currentLocationId} />
            )}
        </NodeCardComponent>
    );
};

export default CharacterCard;
