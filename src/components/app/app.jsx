import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { RoutePage } from '../pages';
import Header from '../header';
import { Spinner } from '../spinner';
import ToastMessage from '../toast-message';

import './app.scss';
import Footer from '../footer';

const App = ({ loading }) => {
  const spinner = loading ? <Spinner /> : null;
  return (
    <div className="wrapper">
      <Header />
      <ToastMessage />
      <div className="content">
        <RoutePage />
      </div>
      <Footer />
      {spinner}
    </div>
  );
};

App.propTypes = {
  loading: PropTypes.bool
};

const mapStateToProps = ({ otherData: { loading } }) => {
  return { loading };
};

export default connect(mapStateToProps)(App);
