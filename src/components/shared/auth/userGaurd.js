import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class UserGaurd extends Component {

    constructor() {
        super();

        this.state = {
            isAllowed: false,
            isFetching: true
        }
    }

    componentDidMount() {
        this.setState({isFetching: true});

        this.props.verifyUser().then(
        () => {
            this.setState({isAllowed: true, isFetching: false});
        },
        () => {
            this.setState({isAllowed: false, isFetching: false});
        })
    }

    render() {
        const {component: Component, ...rest } = this.props;
        const {isFetching, isAllowed} = this.state;

        if(isAllowed && !isFetching){
            return <Component {...rest} />
        }else if (!isAllowed && !isFetching){
            return <Redirect to={{pathname:'/rentals'}} />
        } else {
            return <h1>Loading...</h1>
        }
    }
}
