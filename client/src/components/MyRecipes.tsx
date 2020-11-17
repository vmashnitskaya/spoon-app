import React, { FunctionComponent } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

const MyRecipes: FunctionComponent = () => {
    const history = useHistory();

    const handleCreateClick = () => {
        history.push('/create');
    };

    return (
        <>
            <Button size="small" variant="outlined" color="primary" onClick={handleCreateClick}>
                Create recipe
            </Button>
        </>
    );
};

export default MyRecipes;
