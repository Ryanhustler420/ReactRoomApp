import React, { Component } from 'react'
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import * as actions from '../../actions';

class Login extends Component {

    constructor() {
        super();


        this.loginUser = this.loginUser.bind(this);
    }

    loginUser(userData){
        // actions.login(userData);
        this.props.dispatch(actions.login(userData));
    }

    render() {

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


function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Login);