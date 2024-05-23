import{verifyGatewayRequest} from '../../9-jobber-shared/src/gateway-middleware.js';
import { healthRoute } from './routes/health.js';
import { orderRoutes } from './routes/order.js';

const BASE_PATH = '/api/v1/order';

const appRoutes = (app)=>{
    app.use('',healthRoute());
    app.use(BASE_PATH,verifyGatewayRequest,orderRoutes());
}

export{appRoutes};