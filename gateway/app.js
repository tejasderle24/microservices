import express from 'express';
import expressProxy from 'express-http-proxy';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/user', expressProxy(process.env.USER_SERVICE_URL));
app.use('/captain', expressProxy(process.env.CAPTAIN_SERVICE_URL));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});