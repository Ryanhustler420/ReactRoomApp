import React, { Component } from 'react'

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
        // const { input: {onChange} } = this.props;

        // onChange('https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg');

        const selectedFile = event.target.files[0];

        if(selectedFile){
            this.setState({selectedFile});
            this.reader.readAsDataURL(selectedFile);            
        }
    }

    uploadImage() {

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
                    <button className='btn btn-success img-upload' 
                            type='button' 
                            disabled={!selectedFile}
                            onClick={() => this.uploadImage()}
                            >Upload</button>
                }
            </div>
        )
    }



    // render() {

    //     const {label, meta: {touched, error} } = this.props;

    //     return (
    //         <div className="form-group">
    //             <label>{label}</label>
    //             <div className="input-group">
    //                 <input 
    //                     type='file' 
    //                     accept='.jpg, .png, .jpeg' 
    //                     onChange={this.onChange} 
    //                 />
    //             </div>
    //             {touched &&
    //                 ((error && <div className="alert alert-danger">{error}</div>))}
    //         </div>
    //     )
    // }
}
