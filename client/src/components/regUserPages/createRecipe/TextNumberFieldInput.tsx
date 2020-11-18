import React, { ChangeEvent, FunctionComponent } from 'react';
import { TextField } from '@material-ui/core';

interface TextFieldInputProps {
    name: string;
    label: string;
    type: string;
    required: boolean;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string | number;
    className?: any;
}

const TextNumberFieldInput: FunctionComponent<TextFieldInputProps> = ({
    name,
    label,
    type,
    required,
    onInputChange,
    value,
    className,
}) => {
    return (
        <TextField
            name={name}
            label={label}
            type={type}
            multiline={type === 'textarea'}
            rows={type === 'textarea' ? 2 : 1}
            required={required}
            margin="normal"
            value={value}
            onChange={onInputChange}
            className={className}
        />
    );
};

export default TextNumberFieldInput;
