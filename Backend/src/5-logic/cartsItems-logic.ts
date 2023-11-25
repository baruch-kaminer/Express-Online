import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import CartItemsModel from "../4-models/cartItems-model";
import { ResourceNotFoundErrorModel } from "../4-models/error-models";



async function getCartItemsByCartId(cartId: number): Promise<CartItemsModel[]> {    
    const sql = `SELECT * FROM cartsItems WHERE cartId = ?`;
    const cartItems = await dal.execute( sql, [cartId] );
    return cartItems;
}

async function getSumPriceByCartId(cartId: number): Promise<number> {
    
    
    const sql = `SELECT SUM(price) FROM cartsItems WHERE cartId = ?`;
    const sumPrice = await dal.execute( sql, [cartId] );
    return sumPrice[0]['SUM(price)'] ;
}

async function addCartItem(cartItem: CartItemsModel): Promise<CartItemsModel> {
    const sql = `INSERT INTO cartsItems VALUES( DEFAULT, ?, ?, ?, ?, ? ) `;
    const info:OkPacket = await dal.execute( sql, [
        cartItem.productId, cartItem.productName, cartItem.amount, cartItem.price, cartItem.cartId
    ] );
    cartItem.cartItemsId = info.insertId;
    return cartItem;
}

async function updateAmountItems(cartItem: CartItemsModel): Promise<CartItemsModel> {
    const sql = `
    UPDATE cartsItems SET
    amount = ?, price = ? 
    WHERE cartItemsId = ?
    `;
    const info:OkPacket = await dal.execute( sql, [ cartItem.amount,cartItem.price, cartItem.cartItemsId ] );

    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(cartItem.cartItemsId);
    return cartItem;
}

async function deleteCartItem(cartItemId: number): Promise<void> {
    const sql = `DELETE FROM cartsItems WHERE cartItemsId = ?`;
    const info:OkPacket = await dal.execute( sql, [cartItemId] );
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(cartItemId);
}

async function deleteAllCartItems(cartId: number): Promise<void> {
    const sql = `DELETE FROM cartsItems WHERE cartId = ?`;
    const info:OkPacket = await dal.execute( sql, [cartId] );
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(cartId);
}

export default{
    getCartItemsByCartId,
    getSumPriceByCartId,
    addCartItem,
    updateAmountItems,
    deleteCartItem,
    deleteAllCartItems
}