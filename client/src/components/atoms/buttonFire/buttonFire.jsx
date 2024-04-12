import React from 'react';

const styles = {
  primary: { background: 'blue', color: 'white' },
  secondary: { background: 'gray', color: 'black' },
  danger: { background: 'red', color: 'white' }
};

const Button = ({ variant, children, ...props }) => {
  const style = styles[variant] || {};
  return <button style={style} {...props}>{children}</button>;
};

export default Button;
