import { useCallback } from 'react';
import { useGlobalContext } from '../../contexts/global.context';
import { Character } from '../../types/character.types';
import NodeCardComponent from '../node/node-card-component';
import EditCharacter, { OnCharacterSubmit } from './edit-character';
import { useClickOutside, useToggle } from '@mantine/hooks';
import ViewCharacter from './view-character';

const CharacterCard = ({ id }: { id: Character['id'] }) => {
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
            const newCharacter = {
                ...character,
                ...values,
                locations: values.locations.map(Number),
            };
            updateCharacter(newCharacter);
            toggleEdit(false);
        },
        []
    );

    return (
        <NodeCardComponent
            ref={ref}
            onDelete={() => deleteCharacter(id)}
            onSelect={()  => toggleEdit(true)}
            showHover
        >
            {isEdit && <EditCharacter id={id} onSubmit={_onUpdateCharacter} />}
            {!isEdit && <ViewCharacter id={id} />}
        </NodeCardComponent>
    );
};

export default CharacterCard;
