import React, { Component } from 'react'
import * as actions from '../../actions';

export default class RentalManage extends Component {

    constructor() {
        super();

        this.state = {
            userRental: [],
            errors: []
        }
    }

    componentWillMount() {
        actions.getUserRentals().then(
            result => this.setState({userRental: result}),
            errors => this.setState({errors})
        )
    }

    renderData() {
        const { userRental, errors } = this.state;

        if(userRental){
            return userRental.map((rental, index) => <p key={index} >{rental.title}</p>)
        }else if(!userRental || errors){
            return <h1>Sorry, But there are no rental!</h1>
        }
    }

    render() {
        return (
            <div>
                {this.renderData()}
            </div>
        )
    }
}
