import React, { Component } from 'react';
import './App.css';
import  Header  from './shared/Header';
import RentalCard from './components/rental/RentalCard';

class App extends Component {
  render() {
    return(
      <div>
        <Header />
        <div className="container">
          <section id="rentalListing">
            <h1 className="page-title"> Your Home All Around the World</h1>
            <div className="row">
              <RentalCard />
              <RentalCard />
              <RentalCard />
              <RentalCard />
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default App;