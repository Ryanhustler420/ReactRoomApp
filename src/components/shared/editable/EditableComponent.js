import React from 'react';

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
        const { entity, entityField } = this.props;
        const value = entity[entityField];

        this.setState({
            value,
            originValue: value
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