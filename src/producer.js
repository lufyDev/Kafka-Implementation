require('dotenv').config();
const { kafka } = require('./kafka');

const topic = process.env.TOPIC;

async function run () {

  const producer = kafka.producer();
  await producer.connect();

  //send 10 messages, some with same key (to pin them to a particular partition)
  for (let i=1; i<=10; i++){
    const key = i % 2 === 0 ? 'even' : 'odd';
    const value = JSON.stringify({i, msg: `hello #${i}`, ts: Date.now() });

    await producer.send({
      topic,
      messages: [{key, value}],
    })

    console.log(`➡️  sent: key=${key} value=${value}`);
    await new Promise(r => setTimeout(r, 300)); // small delay to see the flow
  }

  await producer.disconnect();
}

run().catch(async (e) => {
  console.error('producer error:', e);
  process.exit(1);
});
