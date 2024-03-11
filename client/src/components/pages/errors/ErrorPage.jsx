import React from 'react';

function ErrorPage({ errorMessage }) {
  return (
    <div className="error-page">
      <h1>Oops! Something went wrong.</h1>
      <p>{errorMessage}</p>
      <img src="/img/errors/error-400.png" alt="Error" />
    </div>
  );
}

export default ErrorPage;
