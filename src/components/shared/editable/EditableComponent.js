import React from 'react';
import { toast } from 'react-toastify';

export class EditableComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            isActive: false,
            value: undefined,
            originValue: undefined
        }
    }

    componentDidMount() {
        this.setOriginalValue();
    }

    componentDidUpdate() {
        const { errors, entityField, resetErrorsFunc } = this.props;

        if(errors && errors.length > 0 && errors[0].title === entityField){
            this.setOriginalValue();
            toast.error(`${errors[0].detail}`);
            resetErrorsFunc();
        }
    }

    setOriginalValue() {
        const {entity, entityField} = this.props;
        this.setState({
            value: entity[entityField],
            originValue: entity[entityField],
            isActive: false
        });
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        })
    }

    disableEdit() {
        this.setState({isActive: false})
    }

    enableEdit() {
        this.setState({isActive: true});
    }

    update() {

        const { value, originValue} = this.state;
        const { entity: rental, updateEntity, entityField } = this.props;
        if(value !== originValue){
            if(value.trim() === ''){
                toast.error(`Field Cannot Be Empty!!!`);
                this.setState({value: originValue});
            } else {
                updateEntity({
                    [entityField]: value
                }, rental._id);
                this.setState({
                    isActive: false,
                    originValue: value
                })
            }
        }
    }
}