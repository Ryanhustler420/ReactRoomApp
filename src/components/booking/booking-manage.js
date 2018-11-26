import React, { Component } from 'react'
import * as actions from '../../actions';
import { connect } from 'react-redux';

class BookingManage extends Component {

    componentWillMount() {
        this.props.dispatch(actions.fetchUserBookings());
    }

    render() {
        const { booking } = this.props;
        return (
            <div className="row">
                { booking.data.map((booking,index) => <p key={index} >{booking.startAt} - {booking.endAt} </p>) }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        booking: state.manager
    }
}

export default connect(mapStateToProps)(BookingManage);