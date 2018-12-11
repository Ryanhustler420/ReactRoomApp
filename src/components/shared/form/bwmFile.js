import React, { Component } from 'react'
import * as actions from './../../../actions';
export default class BwmFile extends Component {

    constructor() {
        super();

        this.setupReader();

        this.state = {
            selectedFile : undefined,
            imageBase64: ''
        }

        this.onChange = this.onChange.bind(this);
    }

    setupReader() {
        this.reader = new FileReader(); //this is pre defined class

        this.reader.addEventListener('load', (event) => {
            this.setState({imageBase64: event.target.result});
        });
    }

    onChange(event){

        const selectedFile = event.target.files[0];

        if(selectedFile){
            this.setState({selectedFile});
            this.reader.readAsDataURL(selectedFile);            
        }
    }

    onError(error) {

    }

    onSuccess(uploadImage) {
        const { input: {onChange} } = this.props;
        onChange(uploadImage);
    }

    uploadImage() {
        const { selectedFile } = this.state;

        if(selectedFile){
            actions.uploadImage(selectedFile).then(
                (uploadedImage) => { this.onSuccess(uploadedImage) },
                (error) => { this.onError(error) }
            )
        }
    }

    render() {
        const { label, meta: {touched, error} } = this.props;
        const { selectedFile, imageBase64 } = this.state;

        return (
            <div className="img-upload-container">
                <label className='img-upload btn btn-bwm'>
                    <span className='upload-text'>Select Image</span>
                    <input 
                        type='file' 
                        accept='.jpg, .png, .jpeg' 
                        onChange={this.onChange} 
                    />
                </label>

                { selectedFile && 
                    <button className='btn btn-success btn-upload' 
                            type='button' 
                            disabled={!selectedFile}
                            onClick={() => this.uploadImage()}
                            >Upload</button>
                }
                {touched &&  
                    ((error && <div className="alert alert-danger">{error}</div>))
                }

                {
                    imageBase64 && 
                    <div className='img-preview-container'>
                        <div className='img-preview'
                            style={{'backgroundImage':`url(${imageBase64})`}}>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
