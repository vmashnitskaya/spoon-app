import React, { ChangeEvent, FunctionComponent, useEffect, useMemo, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';

import authActions from '../redux/auth/authActions';
import { UserInput } from '../redux/auth/authInterfaces';

interface FieldsInterface {
    id: string;
    label: string;
    fieldType: string;
    login: boolean;
    register: boolean;
    min: number;
    max: number;
}

interface AuthDialogProps {
    open: boolean;
    handleClose: () => void;
    registerUser: (userInput: UserInput) => void;
    loginUser: (userInput: UserInput) => void;
}

const useStyles = makeStyles({
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    loginButton: {
        marginTop: '10px',
    },
});

const AuthDialog: FunctionComponent<AuthDialogProps> = ({
    open,
    handleClose,
    registerUser,
    loginUser,
}) => {
    const classes = useStyles();
    const [authType, setAuthType] = useState<'login' | 'register'>('login');
    const [userInput, setUserInput] = useState<UserInput>();
    const fields: FieldsInterface[] = useMemo(
        () => [
            {
                id: 'email',
                label: 'Email address',
                fieldType: 'email',
                login: true,
                register: true,
                max: 255,
                min: 7,
            },
            {
                id: 'password',
                label: 'Password',
                fieldType: 'password',
                login: true,
                register: true,
                max: 12,
                min: 8,
            },
            {
                id: 'first_name',
                label: 'First Name',
                fieldType: 'text',
                login: false,
                register: true,
                max: 255,
                min: 1,
            },
            {
                id: 'last_name',
                label: 'Last Name',
                fieldType: 'text',
                login: false,
                register: true,
                max: 255,
                min: 1,
            },
        ],
        []
    );
    const userInputFields: UserInput = useMemo(() => {
        return fields.reduce(
            (acc, el) => (el[authType] ? { ...acc, [el.id]: '' } : { ...acc }),
            {}
        );
    }, [fields, authType, open]);

    useEffect(() => {
        setUserInput(userInputFields);
    }, [userInputFields]);

    const handleAuthTypeChange = () => {
        setAuthType(authType === 'login' ? 'register' : 'login');
    };

    useEffect(() => {
        setAuthType('login');
    }, [open]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        const inputValue = event.target.value;
        setUserInput((prevState) => ({ ...prevState, [id]: inputValue }));
    };

    const validateInput = () => {
        return fields.every((el) => {
            if (el[authType]) {
                return (
                    userInput &&
                    userInput[el.id].length >= el.min &&
                    userInput[el.id].length <= el.max
                );
            }
            return true;
        });
    };

    const handleAuth = async () => {
        if (authType === 'login' && userInput && validateInput()) {
            await loginUser({ ...userInput });
            handleClose();
        } else if (userInput && validateInput()) {
            await registerUser({ ...userInput, admin: false });
            handleClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                {authType === 'login' ? 'Login' : 'Register'}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    className={classes.closeButton}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {fields.map(
                    (el, index: number) =>
                        el[authType] && (
                            <TextField
                                key={el.id}
                                autoFocus={index === 0}
                                margin="dense"
                                id={el.id}
                                label={el.label}
                                type={el.fieldType}
                                required
                                fullWidth
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleInputChange(e, el.id)
                                }
                                value={userInput ? userInput[el.id] : ''}
                            />
                        )
                )}
                <Button
                    onClick={handleAuth}
                    color="primary"
                    variant="outlined"
                    component="span"
                    className={classes.loginButton}
                >
                    {authType === 'login' ? 'Login' : 'Register'}
                </Button>
            </DialogContent>
            <DialogActions>
                <Button fullWidth onClick={handleAuthTypeChange}>
                    {authType === 'login' ? 'Register' : 'Already have account'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    registerUser: (userInput: UserInput) => {
        dispatch(authActions.registerUser(userInput));
    },
    loginUser: (userInput: UserInput) => {
        dispatch(authActions.loginUser(userInput));
    },
});

export default connect(null, mapDispatchToProps)(AuthDialog);
