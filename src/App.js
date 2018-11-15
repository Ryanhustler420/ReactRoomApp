import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux';

import './App.css';

import  Header  from './shared/Header';
import RentalListing from './components/rental/rentalListing/rentalListing';
import RentalDetail from './components/rental/rentalDetail/RentalDetail';
import Login from './components/login/Login';
import Register from './components/register/Register';

import * as actions from './actions';

const store = require('./reducers').init();

class App extends Component {

  componentWillMount() {
    store.dispatch(actions.checkOutState());
  }

  render() {
    return(
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
            <Route exact path='/' render={() => <Redirect to='/rentals'/>}/>
              <Route exact path='/rentals' component={RentalListing}/>
              <Route exact path='/rentals/:id' component={RentalDetail}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/register' component={Register}/>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;