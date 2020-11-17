import React, { FunctionComponent } from 'react';
import { Typography } from '@material-ui/core';

const NoMatch: FunctionComponent = () => {
    return (
        <Typography color="primary" align="center" variant="h6" display="block" gutterBottom>
            Page not found
        </Typography>
    );
};

export default NoMatch;
