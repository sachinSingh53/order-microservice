import { Client } from '@elastic/elasticsearch';
import { winstonLogger } from '../../9-jobber-shared/src/logger.js';
import config from './config.js';

const log = winstonLogger('orderElasticSearchServer', 'debug');

const elasticSearchClient = new Client({
    node: `${config.ELASTIC_SEARCH_URL}`
});

async function checkConnection() {
    let isConnected = false;
    while (!isConnected) {
        log.info('orderService connecting to ElasticSearch...');
        try {
            const health = await elasticSearchClient.cluster.health({});
            log.info(`orderService Elasticsearch health status - ${health.status}`);
            isConnected = true;
        } catch (error) {
            log.error('Connection to Elasticsearch failed. Retrying...');
            log.log('error', 'orderService checkConnection() method:', error);
        }
    }
}




export {
    checkConnection,
};
