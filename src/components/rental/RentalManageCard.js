import  React  from 'react';
import { Link } from 'react-router-dom';

export class RentalManageCard extends React.Component {

    constructor() {
        super();

        this.state = {
            wantDelete: false
        }
    }

    showDeleteMenu() {
        this.setState({
            wantDelete: true
        })
    }

    closeDeleteMenu() {
        this.setState({
            wantDelete: false
        })  
    }

    render() {

        const { rental, modal } = this.props;
        const { wantDelete } = this.state;

        const deleteClass = wantDelete ? 'toBeDeleted' : '';

        return (
            <div className='col-md-4'>
                <div className={`card text-center ${deleteClass}`}>
                    <div className='card-block'>
                        <h4 className='card-title'>{rental.title} - {rental.city}</h4>
                        <Link className='btn btn-bwm' to={`/rentals/${rental._id}`}>Go to Rental</Link>
                        { rental.bookings && rental.bookings.length > 0 && modal }
                    </div>
                    <div className='card-footer text-muted'>
                        {
                            !wantDelete && 
                            <p>Created at {rental.createdAt}</p>
                        }
                        {   !wantDelete && 
                            <button onClick={() => {this.showDeleteMenu()}} className='btn btn-danger'> Delete </button>
                        }
                        {
                            wantDelete && 
                            <React.Fragment>
                                Do you confirm?
                                <button className='btn btn-danger'> Yes </button>
                                <button className='btn btn-success' onClick={() => {this.closeDeleteMenu()}}> No </button>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default RentalManageCard;