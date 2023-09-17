import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';

const app = express();
app.use(helmet());

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
