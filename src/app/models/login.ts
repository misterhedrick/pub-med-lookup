export interface ILogin {
    email: string;
    password: string;
}

class Login implements ILogin{
    email: string = '';
    password: string = '';
}