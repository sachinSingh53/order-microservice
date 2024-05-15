import{verifyGatewayRequest} from '../../9-jobber-shared/src/gateway-middleware.js';
import { healthRoute } from './routes/health.js';
// import { messageRoutes } from './routes/message.js';

const BASE_PATH = '/api/v1/order';

const appRoutes = (app)=>{
    app.use('',healthRoute());
    // app.use(BASE_PATH,verifyGatewayRequest,console.log('orderService routes'));
}

export{appRoutes};