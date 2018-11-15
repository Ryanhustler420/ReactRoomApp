import React from 'react'
import { Field, reduxForm } from 'redux-form'

const RegisterForm = props => {

    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form className="form-group" onSubmit={handleSubmit}>
            <div>
                <label>First Name</label>
                <div>
                <Field
                    name="firstName"
                    component="input"
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                />
                </div>
            </div>
            <div>
                <label>Last Name</label>
                <div>
                <Field
                    name="lastName"
                    component="input"
                    type="text"
                    placeholder="Last Name"
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
                    placeholder="Email"
                    className="form-control"
                />
                </div>
            </div>
            <div>
                <button className="btn btn-success" type="submit" disabled={pristine || submitting}>
                Submit
                </button>
                <button className="btn btn-danger" type="button" disabled={pristine || submitting} onClick={reset}>
                Clear Values
                </button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'registerForm'
})(RegisterForm)