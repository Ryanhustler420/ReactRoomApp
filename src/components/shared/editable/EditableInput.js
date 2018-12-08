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

    update() {

        const { value, originValue} = this.state;
        const { updateEntity, entityField } = this.props;
        if(value !== originValue){
            updateEntity({
                [entityField]: value
            });
            this.setState({
                isActive: false,
                originValue: value
            })
        }
    }

    renderComponentView() {
        const { value, isActive } = this.state;
        const { className } = this.props;

        if(isActive) {
            return (
                <React.Fragment>
                    <input onChange={(event) => this.handleChange(event)} 
                            value={value} className={className}/>
                    <button type="button" 
                    onClick={() => this.update()} 
                        className='btn btn-success btn-editable'> Save </button>
                    <button type="button" 
                        onClick={() => this.disableEdit()} 
                        className='btn btn-warning btn-editable'> Close </button>
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                <span className={className}> {value} </span>
                <button type="button" 
                    onClick={() => this.enableEdit()} 
                    className='btn btn-warning btn-editable'> Edit </button>
            </React.Fragment>
        )
    }

    render() {

        const { value } = this.state;

        return (
            <div id='editableComponent'>
            {this.renderComponentView()}
            </div>
        )
    }
}