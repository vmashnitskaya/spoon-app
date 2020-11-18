import React, { FunctionComponent } from 'react';
import { Button, Typography } from '@material-ui/core';

interface InputGroupWrapperProps {
    handleAdd: (field: string) => void;
    buttonLabel: string;
    type: string;
    children: JSX.Element;
}

const InputGroupWrapper: FunctionComponent<InputGroupWrapperProps> = ({
    handleAdd,
    buttonLabel,
    type,
    children,
}) => {
    return (
        <>
            <Typography variant="subtitle1" display="block" color="primary" align="center">
                {type.toUpperCase()}
            </Typography>
            <div className="input-wrapper">
                <div className="list">{children}</div>
                <Button color="primary" onClick={() => handleAdd(type)}>
                    {buttonLabel}
                </Button>
            </div>
        </>
    );
};

export default InputGroupWrapper;
