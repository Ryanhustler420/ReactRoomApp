import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { bwmInput } from './../shared/form/bwm-input';
import { BwmResError } from './../shared/form/bwmResError';



const RegisterForm = props => {

    const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
    return (
        <form onSubmit={handleSubmit(submitCb)}>

                    <Field
                        name="username"
                        component="input"
                        type="text"
                        label="username"
                        className="form-control"
                        component={bwmInput}
                    />
                    
                    <Field
                        name="email"
                        component="input"
                        type="email"
                        label="email"
                        className="form-control"
                        component={bwmInput}
                    />
                
                    <Field
                        name="password"
                        component="input"
                        type="password"
                        label="password"
                        className="form-control"
                        component={bwmInput}
                    />
        
                    <Field
                        name="passwordConfirm"
                        component="input"
                        type="password"
                        label="passwordConfirm"
                        className="form-control"
                        component={bwmInput}
                    />
                <button className="btn btn-bwm btn-form" disabled={!valid || pristine || submitting} type="submit">
                    Submit
                </button>
                <BwmResError errors={errors}/>
        </form>
    )
}

const validate = values => {
    const errors = {}
    
    if(values.username && values.username.length < 4){
        errors.username = 'Username min length is 4 characters!';
    }

    if(!values.email){
        errors.email = 'Please enter email';
    }

    if(!values.passwordConfirm){
        errors.passwordConfirm = "Please enter password confirmation!";
    }

    if(values.password !== values.passwordConfirm){
        errors.password = 'Password must be the same';
    }
    return errors
}

export default reduxForm({
    form: 'registerForm',
    validate
})(RegisterForm)