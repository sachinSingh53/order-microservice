import { winstonLogger } from '../../../9-jobber-shared/src/logger.js'
import { updateOrderReview } from '../services/order-service.js';
import { createConnection } from './connection.js'

const log = winstonLogger('orderServiceProducer', 'debug');

const consumerReviewFanoutMessages = async(channel)=>{
    try {
        if (!channel) {
            channel = await createConnection();
        }

        const exchangeName = 'jobber-review';
        const queueName = 'order-review-queue';

        await channel.assertExchange(exchangeName,'fanout');
        const jobberQueue = await channel.assertQueue(queueName,{durable: true, autoDelete: false});
        await channel.bindQueue(jobberQueue.queue,exchangeName,'');

        channel.consume(jobberQueue.queue, async (msg) => {

            await updateOrderReview(JSON.parse(msg.content.toString()))
            channel.ack(msg);
        })
    } catch (error) {
        log.log('error','OrderService publishDirectMessage() method error',error);
    }
}

export{
    consumerReviewFanoutMessages
}