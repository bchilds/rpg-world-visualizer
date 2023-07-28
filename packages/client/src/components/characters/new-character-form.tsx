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
import { Item } from '../../types/items.types';

// create TextInput for autocomplete of existing items from a data source w/ search dd built in
type FormValues = {
    name: string;
    description: string;
    stats: unknown;
    loot: Item[];
    primaryFactionName: string;
    tags: string[];
    locations: {
        id: number;
        notes: string;
    }[];
};
const initialValues: FormValues = {
    name: '',
    description: '',
    stats: {},
    loot: [],
    primaryFactionName: '',
    tags: [],
    locations: [],
};
const NewCharacterForm = () => {
    const form = useForm({
        initialValues,
        validate: {
            name: isNotEmpty('Name is required'),
            // description
        },
    });

    const _onSubmit = useCallback(
        (values: Character) => {
            // handle primaryFactionName picking a faction
            form.validate();

            form.reset();
            form.resetTouched();
        },
        [form]
    );
    return (
        <Stack>
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
                <form
                    onSubmit={form.onSubmit((values) => {
                        console.log({ values });
                    })}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
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
                    {/* search/picker for faction based on factionName */}
                    {/* stats */}
                    {/* create item generator for loot */}
                    {/* search/picker for tags */}
                    {/* add list of locations w/ search and dd */}
                    {/* add notes for location */}
                    <Group position="center" mt="md">
                        <Button type="submit" disabled={!form.isTouched}>
                            Submit
                        </Button>
                        <Button onClick={form.reset}>Reset</Button>
                    </Group>
                </form>
            </Paper>
        </Stack>
    );
};

export default NewCharacterForm;
