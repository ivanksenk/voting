import express from 'express';
import cors from 'cors';
import config from './config/config';
import { MainRouter } from './router';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { initDataBase } from './config/postgres.config';

const app = express();
app.use(express.json());
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(`/${config.API_PREFIX}`, MainRouter);

app.listen(config.PORT, async () => {
    await initDataBase();
    console.log(`App listen at: http://localhost:${config.PORT}/${config.API_PREFIX}`);
})