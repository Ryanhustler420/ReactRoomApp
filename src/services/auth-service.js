import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

class AuthService {

    getToken() {
        return localStorage.getItem('auth_token');
    }

    decode(token) {
        return jwt.decode(token);
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