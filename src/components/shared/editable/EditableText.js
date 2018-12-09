import React from 'react';
import { EditableComponent } from './EditableComponent';

export class EditableText extends EditableComponent {

    renderComponentView() {
        const { value, isActive } = this.state;
        const { className, rows, cols } = this.props;

        if(isActive) {
            return (
                <React.Fragment>
                    <textarea onChange={(event) => this.handleChange(event)} 
                            value={value} className={className}
                            rows={rows} cols={cols}></textarea>
                    
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


        return (
            <div className='editableComponent' style={this.props.containerStyle}>
                {this.renderComponentView()}
            </div>
        )
    }
}