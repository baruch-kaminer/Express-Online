enum RoleModel {
    User = 'User',
    Admin = 'Admin'
}

export class UserModel{
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: RoleModel;
    public city: string;
    public street: string;
}