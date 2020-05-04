import React from 'react';

import './error-indicator.scss';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <div className="error-indicator__icon">
        <img src="/images/error-indicator.png" alt="error icon" />
      </div>
      <span>OOOPS...</span>
      <span>something has gone wrong</span>
      <span>(but we already fixing it)</span>
    </div>
  );
};

export default ErrorIndicator;
