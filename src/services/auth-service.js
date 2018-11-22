import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

class AuthService {

    TOKEN_NAME = 'auth_token'

    getToken() {
        return localStorage.getItem(this.TOKEN_NAME);
    }

    getUsername(){
        return this.decode(this.getToken()).username;
    }

    decode(token) {
        return jwt.decode(token);
    }

    saveToken(token) {
        localStorage.setItem(this.TOKEN_NAME, token);
    }

    invalidateUser() {
        localStorage.removeItem(this.TOKEN_NAME);
    }

    getExpriration(token) {
        const exp = this.decode(token).exp;
        
        return moment.unix(exp);
    }

    isValid(token){
        return moment().isBefore(this.getExpriration(token));
    }

    isAuthenticated() {
        const token = this.getToken();

        return (token && this.isValid(token)) ? true : false;
    }
}

export default new AuthService();