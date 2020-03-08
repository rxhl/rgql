import { useState } from 'react';

export const useForm = (callback, initState = {}) => {
  const [values, setValues] = useState(initState);
  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    callback();
  };
  return {
    onChange,
    onSubmit,
    values
  };
};
