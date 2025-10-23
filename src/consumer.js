require('dotenv').config();
const { kafka } = require('./kafka');

const topic = process.env.TOPIC;
const argGroup = process.argv.find(a => a.startsWith('group='))?.split('=')[1];
const groupId = argGroup || process.env.GROUP_ID || 'hello-group'; // default

async function run() {
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true }); // set true to read the whole history

  console.log(`👂 consumer started with groupId="${groupId}"`);
  await consumer.run({
    eachMessage: async ({ partition, message }) => {
      console.log(
        `got p${partition} key=${message.key?.toString()} value=${message.value?.toString()}`
      );
    },
  });
}

run().catch(e => { console.error(e); process.exit(1); });
