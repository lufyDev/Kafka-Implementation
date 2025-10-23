Been hearing about Kafka everywhere lately - colleagues, meetings, tech blogs. Got curious. Turns out it's the backbone of how companies like Swiggy and Uber handle millions of events without breaking a sweat.

Ever wondered how Swiggy shows your biryani order updates instantly? Or how Uber tracks your cab in real-time? I used to think it was complicated magic. Turns out, it's just smart architecture.

Traditional approach has services calling each other directly via REST APIs. Sounds simple, but it creates a mess. Change one service, risk breaking others. Not fun when you're scaling.

That's where Kafka comes in. Instead of services talking directly, they just announce what happened. Other services listen if they care. That's it. No messy dependencies.

Why this actually matters?

Think about how Swiggy works when you order food:

Order service publishes "Order placed" event

Payment service listens and processes payment

Restaurant service listens and starts cooking process

Delivery service listens and assigns rider

Notification service listens and sends you updates

None of these services call each other directly. They just react to events. If one goes down, others keep working. Want to add loyalty points? Just add a new consumer. No changes to existing code.

That's the power of event streaming. Independent, scalable, flexible.

I've always believed in practical learning, so to get the gist, I built something small - Ran Docker Compose with Kafka + Zookeeper locally, created one topic with 3 partitions, a simple Node.js producer/consumer and watched messages streaming live on different terminals. And wow, some things just clicked.

Same key = same partition, always. Sent messages with odd/even keys. All odd messages landed in one partition, all even in another. Ordering guaranteed. No extra code.

Consumer groups are wild. Ran 2 consumers with same groupId → Kafka split the work automatically. Load balancing.... just happened.

Changed one consumer's groupId → now both reading ALL messages independently. Queue mode to switched to pub/sub automatically.

Same group ID = queue mode (split work)

Different group IDs = pub/sub mode (everyone gets everything)

Watching Kafka rebalance partitions in real-time is honestly pretty satisfying 🚀

Want the full breakdown with code examples? I've written a detailed guide on Medium: 📝

https://medium.com/@vishalpundhirofficial/a-simple-start-to-understanding-apache-kafka-5025855d8164
