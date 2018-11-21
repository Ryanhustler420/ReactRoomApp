import React, { Component } from 'react'
import CreateRentalForm from './RentalCreateForm';

export default class RentalCreate extends Component {

    constructor() {
        super();

        this.rentalsCategories = ['apartment','house','condo'];

        this.state = {
            errors: []
        }

        this.createRental = this.createRental.bind(this);
    }

    createRental(rentalData) {
        console.log(rentalData);
    }

    render() {
        return (
            <section id='newRental'>
                <div className='bwm-form'>
                    <div className='row'>
                        <div className='col-md-5'>
                            <h1 className='page-title'>Create Rental</h1>
                            <CreateRentalForm createRental={this.createRental} errors={this.state.errors} options={this.rentalsCategories}/>
                        </div>
                        <div className='col-md-6 ml-auto'>
                            <div className='image-container'>
                                <h2 className='catchphrase'>Hundreds of awesome places in reach of few clicks.</h2>
                                <img src={process.env.PUBLIC_URL + '/image/create-rental.jpg'} alt=''/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
