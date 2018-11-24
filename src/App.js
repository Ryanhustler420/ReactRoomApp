import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';

import './App.css';

import Header from './components/shared/Header';
import RentalListing from './components/rental/rentalListing/rentalListing';
import RentalDetail from './components/rental/rentalDetail/RentalDetail';
import Login from './components/login/Login';
import Register from './components/register/Register';
import RentalSearchListing from './components/rental/rentalListing/RentalSearchListing';
import RentalCreate from './components/rental/rental-create/RentalCreate';

import ProtectedRoute from './components/shared/auth/protectedRoute';
import LoggedInRoute from './components/shared/auth/loggedInRoute';

import * as actions from './actions';

const store = require('./reducers').init();

class App extends Component {

  componentWillMount() {
    store.dispatch(actions.checkOutState());
  }

  logout() {
    store.dispatch(actions.logout());
  }

  render() {
    return(
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header logout={this.logout}/>
            <div className="container">
            <Route exact path='/' render={() => <Redirect to='/rentals'/>}/>
              <Route exact path='/rentals' component={RentalListing}/>
              <Route exact path='/rentals/:city/homes' component={RentalSearchListing}/>

              <Switch>
                <ProtectedRoute exact path='/rentals/new' component={RentalCreate}/>
                <ProtectedRoute exact path='/rentals/:id' component={RentalDetail}/>
              </Switch>

              <LoggedInRoute exact path='/login' component={Login}/>
              <LoggedInRoute exact path='/register' component={Register}/>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;