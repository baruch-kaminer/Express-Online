import Joi from "joi";

class OrderModel{

    public orderId: number;
    public userId: number;
    public cartId: number;
    public price: number;
    public city: string;
    public street: string;
    public date: string;
    public creditCard: number;

    public constructor(order: OrderModel){
        this.orderId = order.orderId;
        this.userId = order.userId;
        this.cartId = order.cartId;
        this.price = order.price;
        this.city = order.city;
        this.street = order.street;
        this.date = order.date;
        this.creditCard = order.creditCard;

    }

    public static validationSchema = Joi.object({
        city: Joi.string().required().min(2).max(20),
        street: Joi.string().required().min(2).max(20),
        creditCard: Joi.number().required()
    });

    public validate(): string {
        const result = OrderModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default OrderModel;