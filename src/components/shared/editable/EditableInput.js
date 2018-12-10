import React from 'react';
import { EditableComponent } from './EditableComponent';

export class EditableInput extends EditableComponent {


    formatView(value) {
        const { formatedPipe } = this.props;

        if(formatedPipe){
            let formatedValue = value;

            formatedPipe.forEach(pipe => formatedValue = pipe(formatedValue));
            return formatedValue;
        }

        return value;
    }

    renderComponentView() {
        const { value, isActive } = this.state;
        const { className } = this.props;

        if(isActive) {
            return (
                <React.Fragment>
                    <input onChange={(event) => this.handleChange(event)} 
                            value={this.formatView(value)} className={className}/>
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
                <span className={className}> {this.formatView(value)} </span>
                <button type="button" 
                    onClick={() => this.enableEdit()} 
                    className='btn btn-warning btn-editable'> Edit </button>
            </React.Fragment>
        )
    }

    render() {


        return (
            <div className='editableComponent' style={this.props.containerStyle}>
                {this.renderComponentView()}
            </div>
        )
    }
}