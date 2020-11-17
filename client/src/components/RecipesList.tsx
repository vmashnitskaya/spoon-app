import React, { FunctionComponent } from 'react';
import { Typography } from '@material-ui/core';

const RecipesList: FunctionComponent = () => {
    return (
        <div className="recipes-list">
            <Typography variant="subtitle1" display="block" gutterBottom>
                RECIPES
            </Typography>
        </div>
    );
};

export default RecipesList;
