import { winstonLogger } from '../../../9-jobber-shared/src/logger.js'
import { createConnection } from './connection.js'

const log = winstonLogger('orderServiceProducer', 'debug');

async function publishDirectMessage(channel, exchangeName, routingKey, message, logMessage) {
    try {
        if (!channel) {
            channel = await createConnection();
        }
        await channel.assertExchange(exchangeName, 'direct');
        channel.publish(exchangeName, routingKey, Buffer.from(message));
        log.info(logMessage);
    } catch (error) {
        log.log('error','OrderService publishDirectMessage() method error',error);
    }
}

export {publishDirectMessage};