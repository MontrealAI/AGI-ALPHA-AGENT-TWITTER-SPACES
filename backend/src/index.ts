import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server as WebSocketServer } from 'ws';
import spacesRouter from './routes/spaces';
import { initTwitterStream } from './utils/twitterAPI';
import { initBlockchain } from './utils/blockchain';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/spaces', spacesRouter);

const server = createServer(app);
const wss = new WebSocketServer({ server });

// WebSocket endpoint for real-time AGI ALPHA AGENT events
wss.on('connection', (ws) => {
  console.log('New WebSocket connection established');
  ws.on('message', (message) => {
    console.log(`Received message: ${message.toString()}`);
    // Additional message handling can be implemented here.
  });
});

// Initialize external integrations
initTwitterStream(wss);
initBlockchain();

server.listen(port, () => {
  console.log(`AGI ALPHA AGENT Twitter Spaces server is running on port ${port}`);
});
