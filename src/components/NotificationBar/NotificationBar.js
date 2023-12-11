import React from 'react';
import { Link } from 'react-router-dom';
import './NotificationBar.css';

const NotificationBar = () => {
  return (
    <div className="noti">
            Struggling to manage your finances? See our upcoming plans that cover your needs &nbsp;
            <Link to="/login">
              Login
            </Link>
            &nbsp;|&nbsp;
            <Link to="/signUp">
              SignUp
            </Link>
    </div>
  );
};

export default NotificationBar;
