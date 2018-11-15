import React, { Component } from 'react'
import RegisterForm from './RegisterForm'

class Register extends Component {

    registerUser(userData){
        console.log(userData);
    }

    render() {
        return (
            <section id="register">
                <div className="bwm-form">
                    <div className="row">
                        <div className="col-md-5">
                            <h1>Register</h1>
                            <RegisterForm submitCb={this.registerUser}/>
                        </div>
                        <div className="col-md-6 ml-auto">
                            <div className="image-container">
                                <h2 className="catchphrase">As our member you have access to most awesome place in the world.</h2>
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Register;