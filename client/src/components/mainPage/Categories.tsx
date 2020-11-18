import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { RootState } from '../../redux/rootReducer';
import recipesSelectors from '../../redux/recipes/recipesSelectors';
import { SelectOptions } from '../../redux/recipes/recipesInterfaces';

interface CategoriesProps {
    categories: SelectOptions[];
    categorySelected: string;
}

const useStyles = makeStyles((theme) => ({
    activeLink: {
        color: theme.palette.primary.main,
    },
    notActiveLink: {
        color: 'black',
    },
}));

const Categories: FunctionComponent<CategoriesProps> = ({ categories, categorySelected }) => {
    const classes = useStyles();
    return (
        <ul className="categories">
            <Typography variant="subtitle1" display="block" gutterBottom>
                CATEGORIES
            </Typography>
            {categories.map((el) => (
                <li key={el.query}>
                    <Typography variant="overline" display="block">
                        <Link
                            to={`/recipes?category=${el.query}`}
                            className={
                                el.query === categorySelected
                                    ? classes.activeLink
                                    : classes.notActiveLink
                            }
                        >
                            {el.label}
                        </Link>
                    </Typography>
                </li>
            ))}
        </ul>
    );
};

const mapStateTorProps = (state: RootState) => ({
    categories: recipesSelectors.categories(state),
});

export default connect(mapStateTorProps)(Categories);
