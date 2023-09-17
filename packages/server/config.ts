import 'dotenv/config';

const NODE_ENVS = ['development', 'production', 'local'] as const;

const PORT = Number.isInteger(Number(process.env.PORT))
    ? Number(process.env.PORT)
    : 3000;

const config = {
    PORT,
    NODE_ENV: NODE_ENVS.find((env) => env === process.env.NODE_ENV) ?? 'local',
};

export default config;
