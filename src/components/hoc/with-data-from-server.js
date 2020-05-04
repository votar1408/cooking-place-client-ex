/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { useQuery } from 'react-apollo';
import { connect } from 'react-redux';
import { loadingAction } from '../../redux/actions';

const withDataFromServer = query => Wrapped => {
  const component = props => {
    const { loading, data } = useQuery(query);
    const { loadingAction } = props;

    useEffect(() => {
      loadingAction(loading);
    }, [loading]);

    if (data === undefined) {
      return null;
    }

    return <Wrapped {...props} data={data} />;
  };

  return connect(null, { loadingAction })(component);
};

export default withDataFromServer;
