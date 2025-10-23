require('dotenv').config();
const { Kafka, logLevel } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'hello-kafka',
  brokers: process.env.KAFKA_BROKERS.split(','),
  logLevel: logLevel.NOTHING,
});

module.exports = { kafka };
