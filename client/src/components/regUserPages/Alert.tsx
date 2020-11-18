import React, { FunctionComponent, useEffect, useState } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { resetMessages } from '../../redux/recipes/recipesSlice';

interface AlertOwnProps {
    message: string;
    resetAllMessages: () => void;
    color: 'error' | 'success' | 'info' | 'warning' | undefined;
}

const Alert: FunctionComponent<AlertOwnProps> = ({ message, resetAllMessages, color }) => {
    const [open, setOpen] = useState(Boolean(message));

    useEffect(() => {
        setOpen(Boolean(message));
    }, [message]);

    useEffect(() => {
        if (!open) {
            resetAllMessages();
        }
    }, [open]);

    const handleClose = () => {
        resetAllMessages();
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={color}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
};
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    resetAllMessages: () => dispatch(resetMessages()),
});

export default connect(null, mapDispatchToProps)(Alert);
