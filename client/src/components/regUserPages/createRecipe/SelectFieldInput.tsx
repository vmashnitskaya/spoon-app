import React, { ChangeEvent, FunctionComponent } from 'react';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { SelectOptions } from '../../../redux/recipes/recipesInterfaces';

interface SelectFieldInputProps {
    label?: string;
    required: boolean;
    options: SelectOptions[];
    handleChange: (e: ChangeEvent<{ value: unknown }>) => void;
    className?: any;
    value: string;
    name: string;
}

const SelectFieldInput: FunctionComponent<SelectFieldInputProps> = ({
    name,
    required,
    options,
    handleChange,
    className,
    value,
    label,
}) => {
    return (
        <>
            {label && label.length && <InputLabel htmlFor={name}>{label}</InputLabel>}
            <Select
                onChange={(e) => handleChange(e)}
                required={required}
                className={className}
                value={value}
                name={name}
            >
                {options.map((element, index) => (
                    <MenuItem key={`${index + 1}_${element.name}`} value={element.name}>
                        {element.label}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
};

export default SelectFieldInput;
