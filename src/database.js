
import mongoose from 'mongoose'
import{winstonLogger} from '../../9-jobber-shared/src/logger.js';
import config from './config.js';

const log = winstonLogger('OrderService Database Server','debug');

const databaseConnection = async ()=>{
    try {
        await mongoose.connect(`${config.DATABASE_URL}`);
        log.info('order-service is successfully connected to database');
    } catch (error) {
        log.log('error','OrderService databaseConnection() error',error);
    }
}

export {databaseConnection};