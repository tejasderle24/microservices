import http from 'http';
import app from './app.js';

const PORT = process.env.PORT || 4003;
    

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Ride server running on port ${PORT}`);
});
