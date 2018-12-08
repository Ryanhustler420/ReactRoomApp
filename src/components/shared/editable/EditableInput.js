import React from 'react';

export class EditableInput extends React.Component {

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

    render() {

        const { value } = this.state;

        return (
            <div>
                <input value={value}/>
            </div>
        )
    }
}