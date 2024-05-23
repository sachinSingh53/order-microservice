import express from 'express';
import { buyerOrders, orderId, sellerOrders } from '../controllers/order/get.js';
import { intent, order } from '../controllers/order/create.js';
import { buyerApproveOrder, cancel, deliverOrder, deliveryDate, requestExtension } from '../controllers/order/update.js';
import{notifications } from '../controllers/notification/get.js'
import { markNotificationAsRead } from '../services/notification-service.js';
const router = express.Router();
const orderRoutes = ()=>{

    //order-routes
    router.get('/:orderId',orderId);
    router.get('/seller/:sellerId',sellerOrders);
    router.get('/buyer/:buyerId',buyerOrders);
    router.post('/',order);
    router.post('/create-payment-intent',intent);
    router.put('/cancel/:orderId',cancel);
    router.put('/extension/:orderId',requestExtension);
    router.put('/deliver-order/:orderId/:type',deliverOrder);
    router.put('/approve-order/:orderId',buyerApproveOrder);
    router.put('/gig/:type/:orderId',deliveryDate);
    
    //notification-routes
    router.get('/notification/:userTo',notifications);
    router.put('/noitification/marked-as-read',markNotificationAsRead);





    
    return router;
}


export{orderRoutes}
