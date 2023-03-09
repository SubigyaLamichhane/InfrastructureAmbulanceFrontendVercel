import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  name: string;
  label: string;
  placeholder: string;
};

const InputField: React.FC<InputFieldProps> = ({ size: _, ...props }) => {
  // !!error : error in string so checking empty string
  const [field, { error }] = useField(props);
  return (
    <div className="w-full mb-16">
      <h4 className="text-p font-proxima">{props.label}</h4>
      <input
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        className="
        bg-white
        rounded-lg
        w-full
        border-2
        border-[#374151]
        p-[24px]
        
        mb-2
        "
        {...props}
        {...field}
        id={field.name}
        autoComplete="off"
        placeholder={props.placeholder}
      />
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;
