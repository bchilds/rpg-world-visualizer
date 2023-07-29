import {
    Button,
    Group,
    Paper,
    Stack,
    TextInput,
    Textarea,
    Title,
    MultiSelect,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useCallback, useMemo } from 'react';
import { Item } from '../../types/items.types';
import { useGlobalContext } from '../../contexts/global.context';
import { Character } from '../../types/character.types';

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
    const { allLocations, allCharacters, setAllCharacters } =
        useGlobalContext();
    const locationOptions = useMemo(() => {
        return allLocations.map((location) => ({
            value: location.id.toString(),
            label: location.name,
        }));
    }, [allLocations]);

    const form = useForm({
        initialValues,
        validate: {
            name: isNotEmpty('Name is required'),
            // description
        },
    });

    const _onSubmit = useCallback(
        (values: FormValues) => {
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
                        _onSubmit(values);
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
                    <MultiSelect
                        data={locationOptions}
                        label="Locations"
                        placeholder="Associated locations"
                        searchable
                        clearable
                        nothingFound="Nope."
                        {...form.getInputProps('locations')}
                    />
                    {/* add notes for location somehow -- I may do this in character list actually */}
                    {/* MultiSelect for faction based on factionName */}
                    {/* stats */}
                    {/* create item generator for loot */}
                    {/* MultiSelect for tags w/ create */}
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
