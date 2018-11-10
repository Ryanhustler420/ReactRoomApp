import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import * as redux from 'redux';
import { Provider } from 'react-redux';

import './App.css';

import  Header  from './shared/Header';
import RentalList from './components/rental/RentalList';
import RentalDetail from './components/rental/RentalDetail';

import Data from './components/rental/RentalDataStore';

class App extends Component {
  render() {
    const store = redux.createStore(() => {
      return{
        rentals:Data['Rentals']
      }
    })

    return(
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
            <Route exact path='/' render={() => <Redirect to='/rentals'/>}/>
              <Route exact path='/rentals' component={RentalList}/>
              <Route exact path='/rentals/:id' component={RentalDetail}/>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;