import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import { AuthErrorModel, ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import UserModel from "../4-models/user-model";
import CredentialsModel from "../4-models/credentials-model";
import RoleModel from "../4-models/role-model";


async function register(user: UserModel): Promise<string> {
    const error = user.validate();
    if (error) throw new ValidationErrorModel(error);
    if (await isEmailTaken(user.email)) throw new ValidationErrorModel(`email ${user.email} already taken`);

    user.password = cyber.hash(user.password);
    user.role = RoleModel.User ;
    
    const sql = `INSERT INTO users VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const info:OkPacket = await dal.execute(sql, [user.userId, user.firstName,user.lastName,user.email, user.password, user.role, user.city, user.street]);
    console.log(user);
    
    const token = cyber.getNewToken(user);
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
    
    const error = credentials.validate();
    if (error) throw new AuthErrorModel(error);
    credentials.password = cyber.hash(credentials.password);
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;    
    const users = await dal.execute(sql, [credentials.email, credentials.password]);
    if (users.length === 0) throw new AuthErrorModel("Incorrect email or password");
    const user = users[0];
    const token = cyber.getNewToken(user);
    return token;
}

async function isEmailTaken(email: string): Promise<boolean> {
    const sql = `SELECT COUNT(*) FROM users WHERE email = ?`;
    let count = await dal.execute(sql,[email]);
    for (const key in count[0]) {
        count = count[0][key] ;  
    }  
    return count > 0;
}
async function isIdTaken(id: number): Promise<boolean> {
    const sql = `SELECT COUNT(*) FROM users WHERE userId = ?`;
    let count = await dal.execute(sql,[id]);
    for (const key in count[0]) {
        count = count[0][key] ;  
    }  
    return count > 0;
}

async function getOneUser(id: number): Promise<UserModel> {
    const sql = `SELECT * FROM users WHERE userId = ?`;
    const users = await dal.execute(sql, [id]);
    if (users.length === 0) throw new ResourceNotFoundErrorModel(id);
    const user = users[0];
    return user;
}

async function updateUser(user: UserModel): Promise<UserModel> {

    if (await isEmailTaken(user.email)) throw new ValidationErrorModel(`email ${user.email} already taken`);

    const sql = `
        UPDATE users SET
            firstName = ?,
            lastName = ?,
            email = ?
        WHERE userId = ?`;
    const info: OkPacket = await dal.execute(sql,[user.firstName, user.lastName, user.email, user.userId]);
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(user.userId);
    return user;
}

export default {
    register,
    login,
    getOneUser,
    updateUser,
    isIdTaken,
    isEmailTaken
}