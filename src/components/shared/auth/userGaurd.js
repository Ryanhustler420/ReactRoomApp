import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class UserGaurd extends Component {
    render() {
        const {isAllowed, isFetching } = this.props;

        if(isAllowed && !isFetching){
            return this.props.children;
        }else if (!isAllowed && !isFetching){
            return <Redirect to={{pathname:'/rentals'}} />
        } else {
            return <h1>Loading...</h1>
        }
    }
}
