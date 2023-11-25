import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import OrderModel from "../4-models/order-model";
import { ValidationErrorModel } from "../4-models/error-models";




async function getSumOrders(): Promise<number> {
    const sql = `SELECT COUNT(*) FROM orders`;
    const sum = await dal.execute( sql, [] );
    return sum;
}

async function getLastOrderByUserId(userId: number): Promise<OrderModel[]> {
    const sql = `SELECT MAX(date) as date FROM carts WHERE userId = ?    `;
    const order = await dal.execute( sql, [userId] ); 
    for (const key in order) {
        if(order[key]['date'] == null) return undefined;
    }   
    return order
}

async function addOrder(order: OrderModel): Promise<OrderModel> {

    const sql = `INSERT INTO orders VALUES( DEFAULT, ?, ?, ?, ?, ?, ?, ?) `;
    const info:OkPacket = await dal.execute( sql, [
        order.userId, order.cartId, order.price, order.city, order.street, order.date, order.creditCard
    ] );
    order.orderId = info.insertId;
    const sql2 = `UPDATE carts SET state = 1 WHERE cartId = ?`;
    await dal.execute( sql2, [order.cartId] );
    return order;
}


export default{
    getSumOrders,
    getLastOrderByUserId,
    addOrder
}