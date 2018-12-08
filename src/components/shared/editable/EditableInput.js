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

    renderComponentView() {
        const { value, isActive } = this.state;

        if(isActive) {
            return (
                <React.Fragment>
                    <input onChange={(event) => this.handleChange(event)} value={value}/>
                    <button type="button" onClick={() => this.disableEdit()} className='btn btn-warning'> Close </button>
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                <p> {value} </p>
                <button type="button" onClick={() => this.enableEdit()} className='btn btn-warning'> Edit </button>
            </React.Fragment>
        )
    }

    render() {

        const { value } = this.state;

        return (
            <div>
            {this.renderComponentView()}
            </div>
        )
    }
}