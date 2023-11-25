import Joi from "joi";
import RoleModel from "./role-model";

class UserModel {
    
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: RoleModel;
    public city: string;
    public street: string;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.city = user.city;
        this.street = user.street;
    }

    public static validationSchema = Joi.object({
        // userId: Joi.number().required().integer().min(7).max(11),
        userId: Joi.number().required().integer(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        email: Joi.string().required().min(7).max(20),
        password: Joi.string().required().min(4).max(20),
        role: Joi.string().optional(),
        city: Joi.string().required().min(2).max(20),
        street: Joi.string().required().min(2).max(20)
    });

    public validate(): string {
        const result = UserModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default UserModel;