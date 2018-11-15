import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { bwmInput } from './../shared/form/bwm-input';
import { require, minLength4 } from '../shared/form/validators';

const LoginForm = props => {
    const { handleSubmit, pristine, submitting, valid, loginUser } = props
    return (
        <form onSubmit={handleSubmit(loginUser)}>
            <Field
                name="email"
                component="input"
                type="email"
                label="Email"
                className="form-control"
                component={bwmInput}
                validate={[require, minLength4]}
            />

            <Field
                name="password"
                component="input"
                type="password"            
                label="Password"
                className="form-control"
                component={bwmInput}
                validate={[require]}
            />
            <button type="submit" className="btn btn-bwm btn-form" disabled={!valid || pristine || submitting}>
                Login
            </button>
        </form>
    )
}

export default reduxForm({
    form: 'loginForm'
})(LoginForm)