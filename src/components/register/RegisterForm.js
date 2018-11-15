import React from 'react'
import { Field, reduxForm } from 'redux-form'

const RegisterForm = props => {

    const { handleSubmit, pristine, reset, submitting, submitCb } = props
    return (
        <form className="form-group" onSubmit={handleSubmit(submitCb)}>
            <div>
                <label>Username</label>
                <div>
                <Field
                    name="username"
                    component="input"
                    type="text"
                    className="form-control"
                />
                </div>
            </div>
            <div>
                <label>Email</label>
                <div>
                <Field
                    name="email"
                    component="input"
                    type="email"
                    className="form-control"
                />
                </div>
            </div>
            <div>
                <label>Password</label>
                <div>
                <Field
                    name="password"
                    component="input"
                    type="password"
                    className="form-control"
                />
                </div>
            </div>
            <div>
                <label>Confirm Password</label>
                <div>
                <Field
                    name="passwordConfirm"
                    component="input"
                    type="password"
                    className="form-control"
                />
                </div>
            </div>
            <div>
                <button className="btn btn-bwm btn-form" type="submit" disabled={pristine || submitting}>
                Submit
                </button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'registerForm'
})(RegisterForm)