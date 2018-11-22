import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { bwmInput } from './../../shared/form/bwm-input';
// import { require, minLength4 } from '../../shared/form/validators';
import { BwmResError } from './../../shared/form/bwmResError';
import { bwmTextArea } from './../../shared/form/BwmTextArea';
import { bwmSelect } from './../../shared/form/bwmSelect';
import BwmFile from './../../shared/form/bwmFile';

const CreateRentalForm = props => {
    const { handleSubmit, pristine, submitting, valid, createRental ,errors, options } = props
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
                name="description"
                type="text"
                rows="6"            
                label="Description"
                className="form-control"
                component={bwmTextArea}
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
                name="category"
                label="Category"
                className="form-control"
                component={bwmSelect}
                options={options}
            />
            
            <Field
                name="image"
                label="Image"
                component={BwmFile}
            />

            <Field
                name="bedrooms"
                type="number"            
                label="Bedrooms"
                className="form-control"
                component={bwmInput}
            />

            <Field
                name="dailyRate"
                type="number"            
                label="Daily Rate"
                className="form-control"
                symbol="$"
                component={bwmInput}
            />        
            
            <Field
                name="shared"
                type="checkbox"            
                label="Shared"
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
    form: 'createRentalForm',
    initialValues: {
        shared: false,
        category: 'apartment'
    }
})(CreateRentalForm)