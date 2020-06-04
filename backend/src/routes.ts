import express from 'express';

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.json({ messsage: 'Works fine!' });
});

export default routes; 