import { TextInput, Textarea, MultiSelect, Group, Button } from '@mantine/core';
import { Item } from '../../types/items.types';
import { useForm, isNotEmpty, UseFormReturnType } from '@mantine/form';
import { useCallback, useMemo } from 'react';
import { useGlobalContext } from '../../contexts/global.context';
import { Character } from '../../types/character.types';

export type FormValues = {
    name: string;
    description: string;
    stats: unknown;
    loot: Item[];
    primaryFactionName: string;
    tags: string[];
    locations: string[] | number[];
};

export type OnCharacterSubmit = (
    formValues: FormValues,
    form: UseFormReturnType<FormValues>
) => void;
export const initialValues: FormValues = {
    name: '',
    description: '',
    stats: {},
    loot: [],
    primaryFactionName: '',
    tags: [],
    locations: [],
};

const EditCharacter = ({
    id,
    onSubmit,
}: {
    id?: Character['id'];
    onSubmit: OnCharacterSubmit;
}) => {
    const { allLocations, allCharacters, setAllCharacters } =
        useGlobalContext();
    const locationOptions = useMemo(() => {
        return allLocations.map((location) => ({
            value: location.id.toString(),
            label: location.name,
        }));
    }, [allLocations]);

    const getFormValuesFromCharacter = (character: Character): FormValues => {
        return {
            name: character.name,
            description: character.description ?? '',
            stats: character.stats,
            loot: character.loot ?? [],
            primaryFactionName: character.primaryFaction?.name ?? '',
            tags: character.tags,
            locations: character.locations.map((id) => id.toString()),
        };
    };

    const character = useMemo(() => {
        return allCharacters.find((character) => character.id === id);
    }, [allCharacters, id]);

    const form = useForm({
        initialValues:
            character !== undefined
                ? getFormValuesFromCharacter(character)
                : initialValues,
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
            values.locations = values.locations.map(Number);

            if (form.isValid()) {
                onSubmit(values, form);

                form.reset();
                form.resetTouched();
            }
        },
        [form]
    );

    return (
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
    );
};

export default EditCharacter;
