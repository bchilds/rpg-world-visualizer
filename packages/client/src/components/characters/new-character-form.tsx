import { Button, Group, Paper, Stack, TextInput, Title } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

const NewCharacterForm = () => {
    const form = useForm({
        initialValues: {
            name: 'New Character',
            description: '',
            stats: {},
            loot: [],
        },
        validate: {
            name: isNotEmpty('Name is required'),
        },
    });
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
                    <Group position="center" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Paper>
        </Stack>
    );
};

export default NewCharacterForm;
