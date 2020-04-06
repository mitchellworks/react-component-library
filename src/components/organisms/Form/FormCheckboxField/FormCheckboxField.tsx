import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import CheckboxField, { ICheckboxFieldProps } from '../../../molecules/CheckboxField/CheckboxField';

export type TFormCheckboxFieldProps = Pick<FieldHookConfig<boolean>, 'validate' | 'name'> & ICheckboxFieldProps;

const FormCheckboxField = ({ name, validate, ...rest }: TFormCheckboxFieldProps) => {
  const [{ value, onChange, onBlur }, { error, touched }] = useField<boolean>({ name, validate });

  return (
    <CheckboxField
      isValid={touched && !error}
      errorMessage={touched && error ? error : ''}
      onChange={onChange}
      onBlur={onBlur}
      value={value.toString()}
      name={name}
      {...rest}
    />
  );
};

export default FormCheckboxField;
