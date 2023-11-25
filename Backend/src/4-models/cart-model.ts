
class CartModel{

    public cartId: number;
    public userId: number;
    public date: string;
    public state:boolean;

    public constructor(cart: CartModel){
        this.cartId = cart.cartId;
        this.userId = cart.userId;
        this.date = cart.date;
        this.state = cart.state;

    }
}

export default CartModel;