import config from './config.ts';
import express from 'express';
import helmet from 'helmet';

const app = express();
app.use(helmet());

app.listen(config.PORT, () => {
    console.log(`Server listening on port ${config.PORT}`);
});
