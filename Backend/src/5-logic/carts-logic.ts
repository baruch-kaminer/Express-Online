import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import CartModel from "../4-models/cart-model";

 

async function getCartByUser(userId: number): Promise<CartModel[]> {
    const sql = `SELECT * FROM carts WHERE userId = ?`;
    const cart = await dal.execute( sql, [userId] );
    return cart;
}
async function getCartByUserIsActive(userId: number): Promise<CartModel[]> {
    const sql = `SELECT * FROM carts WHERE userId = ? AND state = 0`;
    const cart = await dal.execute( sql, [userId] );
    return cart;
}

async function addCart(cart: CartModel): Promise<CartModel> {    
    const sql = `INSERT INTO carts VALUES (DEFAULT, ?, ?, 0)`;
    const info:OkPacket = await dal.execute(sql, [cart.userId, cart.date]);
    cart.cartId =  info.insertId;
    return cart;
}

export default{
    getCartByUser,
    addCart,
    getCartByUserIsActive
}