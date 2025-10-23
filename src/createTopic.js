require('dotenv').config();
const { kafka } = require('./kafka');

(async () => {
  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [{ topic: process.env.TOPIC, numPartitions: 3, replicationFactor: 1 }],
    waitForLeaders: true,
  });
  console.log(`✅ Created topic ${process.env.TOPIC}`);
  await admin.disconnect();
})().catch(err => {
  console.error('createTopic error:', err);
  process.exit(1);
});

