import { useState } from 'react';

export const useFormInput = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleKeyUp = (event) => {
    setIsCapsLockOn(event.getModifierState("CapsLock"));
  };


  return {
    email,
    password,
    isCapsLockOn,
    handleEmailChange,
    handlePasswordChange,
    handleKeyUp
  };
};