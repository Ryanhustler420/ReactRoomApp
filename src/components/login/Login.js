import React, { Component } from 'react'
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import * as actions from '../../actions';
import { Redirect } from 'react-router-dom';

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

        const { isAuth, errors } = this.props.auth;
        const { successRegister } = this.props.location.state || false;

        if(isAuth){
            return <Redirect to={{pathname: '/rentals'}} />
        }

        return (
            <div>
                <section id="login">
                    <div className="bwm-form">
                        <div className="row">
                            <div className="col-md-5">
                                <h1>Login</h1>
                                {
                                    successRegister && 
                                        <div className="alert alert-success">
                                            <p>You Have Been Successfuly Registered, Please Login Now</p>
                                        </div>
                                }
                                <LoginForm loginUser={this.loginUser} errors={errors} />
                            </div>
                            <div className="col-md-6 ml-auto">
                                <div className="image-container">
                                    <h2 className="catchphrase">
                                        Hundreds of awesome places in reach of few clicks.
                                    </h2>
                                    <img src={process.env.PUBLIC_URL + '/image/login-image.jpg'} alt=""/>
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