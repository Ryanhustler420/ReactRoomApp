import  React  from 'react';

export const BwmResError = (props) => {
    const errors = props.errors;

    return (
        errors.length > 0 && 
            <div className="alert alert-danger bwm-res-errors">
                {errors.map((error,index) => <p key={index}> {error.detail} </p>)}
            </div> 
    )
}