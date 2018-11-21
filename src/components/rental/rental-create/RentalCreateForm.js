import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { bwmInput } from './../../shared/form/bwm-input';
// import { require, minLength4 } from '../../shared/form/validators';
import { BwmResError } from './../../shared/form/bwmResError';

const CreateRentalForm = props => {
    const { handleSubmit, pristine, submitting, valid, createRental , errors } = props
    return (
        <form onSubmit={handleSubmit(createRental)}>
            <Field
                name="title"
                type="text"
                label="Title"
                className="form-control"
                component={bwmInput}
            />

            <Field
                name="city"
                type="text"            
                label="City"
                className="form-control"
                component={bwmInput}
            />

            <Field
                name="street"
                type="text"            
                label="Street"
                className="form-control"
                component={bwmInput}
            />

            <Field
                name="bedrooms"
                type="number"            
                label="Bedrooms"
                className="form-control"
                component={bwmInput}
            />

            <Field
                name="dailyRates"
                type="number"            
                label="Daily Rates"
                className="form-control"
                component={bwmInput}
            />        

            <button type="submit" className="btn btn-bwm btn-form" disabled={!valid || pristine || submitting}>
                Create
            </button>
            <BwmResError errors={errors} />
        </form>
    )
}

export default reduxForm({
    form: 'createRentalForm'
})(CreateRentalForm)