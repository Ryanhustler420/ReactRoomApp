import React, { Component } from 'react'
import LoginForm from './LoginForm';
import * as actions from '../../actions';

class Login extends Component {

    constructor() {
        super();

        this.state = {
            errors: []
        }

        this.loginUser = this.loginUser.bind(this);
    }

    loginUser(userData){
        actions.login(userData).then(
            (response) => {
                // redirect from here
                // save token to browser
            },
            (errors) => {
                // throw error
                this.setState({errors:errors});
            }
        )
    }

    render() {
        const { errors } = this.state;

        return (
            <div>
                <section id="login">
                    <div className="bwm-form">
                        <div className="row">
                            <div className="col-md-5">
                                <h1>Login</h1>
                                <LoginForm loginUser={this.loginUser}/>
                            </div>
                            <div className="col-md-6 ml-auto">
                                <div className="image-container">
                                    <h2 className="catchphrase">
                                        Hundreds of awesome places in reach of few clicks.
                                    </h2>
                                    <img src="" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Login;