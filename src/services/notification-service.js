import {OrderNotificationModel} from '../models/notification';
import{socketIoOrderObject} from '../app';

const createNotification = async(data)=>{
    const notification = await OrderNotificationModel.create(data);
    return notification;
}

const getNotificationById = async(userToId)=>{
    const notifications = await OrderNotificationModel.aggregate([
        {
            $match:{userTo:userToId}
        }
    ]);

    return notifications;
}

const markNotificationAsRead = async(notificationId)=>{
    const notification = await OrderNotificationModel.findOneAndUpdate(
        {_id:notificationId},
        {
            $set:{
                isRead: true
            }
        },
        {new: true}
    )

    return notification;
};

const sendNotification = async(data,userToId,message)=>{
    const notification = {
        userTo: userToId,
        senderUsername:data.sellerUsername,
        receicerUsername:data.buyerUsername,
        message,
        orderId: data.orderId
    }

    const orderNotification = await createNotification(notification);
    socketIoOrderObject.emit('order notification',data,orderNotification);
}


export{
    createNotification,
    getNotificationById,
    markNotificationAsRead,
    sendNotification
}