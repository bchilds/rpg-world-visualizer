import {
    Button,
    Group,
    Paper,
    Stack,
    TextInput,
    Textarea,
    Title,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { Character } from '../../types/character.types';
import { useCallback } from 'react';

// create TextInput for autocomplete of existing items from a data source w/ search dd built in

const initialValues: Omit<Character, 'id'> = {
    name: 'New Character',
    description: '',
    stats: {},
    loot: [],
    primaryFaction: null,
    tags: [],
    locations: [],
    locationNotes: [],
};
const NewCharacterForm = () => {
    const form = useForm({
        initialValues,
        validate: {
            name: isNotEmpty('Name is required'),
        },
    });

    const onSubmit = useCallback((values: Character) => {}, []);
    return (
        <Stack>
            <Title order={3}>New Character Form</Title>
            <Paper
                withBorder
                shadow="xs"
                radius="md"
                p="md"
                style={{ textAlign: 'left' }}
            >
                <form
                    onSubmit={form.onSubmit((values) => {
                        console.log({ values });
                    })}
                >
                    <TextInput
                        label="Character Name"
                        placeholder="Enter a name"
                        required
                        withAsterisk
                        {...form.getInputProps('name')}
                    />
                    <Textarea
                        label="Description"
                        placeholder="Enter a description"
                        autosize
                        {...form.getInputProps('description')}
                    />
                    <TextInput
                        label="Faction"
                        placeholder="Enter a faction"
                        {...form.getInputProps('primaryFaction')}
                    />
                    {/* create item generator for loot */}
                    {/* add list of locations w/ search and dd */}

                    <Group position="center" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Paper>
        </Stack>
    );
};

export default NewCharacterForm;
