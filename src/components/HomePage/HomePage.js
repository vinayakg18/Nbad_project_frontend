
import React from 'react';
import './HomePage.css'; 
import NotificationBar from '../NotificationBar/NotificationBar';

const Homepage = () => {
  return (
    <div>
        <NotificationBar/>
    <div className="homepageContainer">
      <div className="textSection">
        <h2>Become debt-free on your own terms. See all transactions.</h2>
        <p>Build an optimal strategy of financial management to pay off your debts with snowball or avalanche methods. See how many payment cycles left until debt-free with PocketGuard debt‑payoff planner.</p>
        <p>Link your banks, credit cards, loans & investment in one place, to keep track of your account balances, net worth and more.</p>
        <button className="contactButton">Contact Us</button>
      </div>
      <div className="imageSection">
        <img src="homepage.jpg" alt="Description" />
      </div>
    </div>
    </div>
  );
};

export default Homepage;
