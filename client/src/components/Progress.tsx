import React, { FunctionComponent } from 'react';
import './Progress.scss';
import { Typography } from '@material-ui/core';

interface ProgressProps {
    error?: string;
}

const Progress: FunctionComponent<ProgressProps> = ({ error }) => {
    return (
        <>
            <div className="wrapper">
                <div className="spinner">
                    <img
                        className="spoon"
                        width="100"
                        height="100"
                        src="/assets/img/spoon.svg"
                        alt="logo"
                    />
                </div>
            </div>
            <Typography color="primary" align="center" variant="h6" display="block" gutterBottom>
                {error}
            </Typography>
        </>
    );
};

export default Progress;
