import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();


const RABBITMQ_URL = process.env.RABBITMQ_URL;

let connection, channel;

export async function connect() {
  connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();
  console.log('Connected to RabbitMQ');
}

export async function subscribeToQueue(queueName, callback) {
  if (!channel) await connect();
  await channel.assertQueue(queueName);
  channel.consume(queueName, (message) => {
    callback(message.content.toString());
    channel.ack(message);
  });
}

export async function publishToQueue(queueName, data) {
  if (!channel) await connect();
  await channel.assertQueue(queueName);
  channel.sendToQueue(queueName, Buffer.from(data));
}
