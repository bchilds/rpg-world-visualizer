import { Paper, Stack, Title } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useCallback } from 'react';
import { useGlobalContext } from '../../contexts/global.context';
import { Character } from '../../types/character.types';
import EditCharacter, { FormValues } from './edit-character';

const NewCharacterForm = () => {
    const { allCharacters, setAllCharacters } = useGlobalContext();

    const _onSubmit = useCallback(
        (values: FormValues, form: UseFormReturnType<FormValues>) => {
            // handle primaryFactionName picking a faction
            form.validate();

            // convert values.locations to numbers from strings

            if (form.isValid()) {
                const nextId =
                    allCharacters[allCharacters.length - 1]?.id ?? -1 + 1;
                const newCharacter: Character = {
                    id: nextId,
                    ...values,
                    locations: values.locations.map(Number),
                    primaryFaction: null, // tbd
                };
                setAllCharacters([...allCharacters, newCharacter]);
                form.reset();
                form.resetTouched();
            }
        },
        [allCharacters, setAllCharacters]
    );
    return (
        <Stack style={{ marginBottom: 'auto' }}>
            <Title order={3} style={{ justifySelf: 'flex-start' }}>
                New Character Form
            </Title>
            <Paper
                withBorder
                shadow="xs"
                radius="md"
                p="md"
                style={{ textAlign: 'left' }}
            >
                <EditCharacter onSubmit={_onSubmit} />
            </Paper>
        </Stack>
    );
};

export default NewCharacterForm;
