import React, { forwardRef } from 'react';
import { useField, FieldHookConfig } from 'formik';
import TextField, { ITextFieldProps } from '../../../molecules/TextField/TextField';

export type TFormTextFieldProps = Pick<FieldHookConfig<string>, 'validate' | 'name'> & ITextFieldProps;

const FormTextField = forwardRef<HTMLInputElement, TFormTextFieldProps>(({ name, validate, ...rest }, ref) => {
  const [{ value, onChange, onBlur }, { error, touched }] = useField({ name, validate });

  return (
    <TextField
      isValid={touched && !error}
      errorMessage={touched && error ? error : ''}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      ref={ref}
      {...rest}
    />
  );
});

export default FormTextField;
