import { useField } from 'formik';
import React, { SelectHTMLAttributes } from 'react';

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {};

const SelectField: React.FC<SelectFieldProps> = ({ size: _, ...props }) => {
  // @ts-ignore
  const [field, { error }] = useField(props);
  return (
    <div className="w-full">
      <select
        className="
        bg-white
        rounded-xl
        w-full
        p-[14px]
        border-2
        border-[#374151]
        mb-2
        "
        {...props}
        autoComplete="off"
        {...field}
        id={field.name}
      >
        <option value="Category">Category</option>
        <option value="Sewage">Sewage</option>
        <option value="Road">Road</option>
        <option value="Electricity">Electricity</option>
        <option value="Water">Drinking water</option>
      </select>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default SelectField;
