
class CartItemsModel{

    public cartItemsId: number;
    public productId: number;
    public productName: string;
    public amount: number;
    public price: number;
    public cartId: number;

    public constructor(cartItems: CartItemsModel){
        this.cartItemsId = cartItems.cartItemsId;
        this.productId = cartItems.productId;
        this.productName = cartItems.productName;
        this.amount = cartItems.amount;
        this.price = cartItems.price;
        this.cartId = cartItems.cartId;
   
    }
}

export default CartItemsModel;