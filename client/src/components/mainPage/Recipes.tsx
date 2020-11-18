import React, { FunctionComponent, useEffect, useState } from 'react';
import { Divider } from '@material-ui/core';
import Categories from './Categories';
import RecipesList from './RecipesList';
import useQuery from '../useQuery';
import './Recipes.scss';

const Recipes: FunctionComponent = () => {
    const [category, setCategory] = useState<string>();
    const query = useQuery();

    useEffect(() => {
        const queryCategory = query.get('category');
        if (queryCategory) {
            setCategory(queryCategory);
        }
    }, [query]);

    return (
        <div className="recipes">
            <Categories categorySelected={query.get('category') || ''} />
            <Divider orientation="vertical" flexItem />
            <RecipesList />
        </div>
    );
};

export default Recipes;
