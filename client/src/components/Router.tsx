import React, { FunctionComponent, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box, Container, Paper } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { RootState } from '../redux/rootReducer';
import authSelectors from '../redux/auth/authSelectors';
import { UserData } from '../redux/auth/authInterfaces';
import Header from './Header';
import NoMatch from './NoMatch';
import Recipes from './Recipes';
import Progress from './Progress';
import Profile from './Profile';
import MyRecipes from './MyRecipes';
import Create from './createRecipe/Create';

interface RouterProps {
    userData: UserData;
    loading: boolean;
    error: string;
}

const useStyles = makeStyles(() => ({
    main: () => ({
        backgroundColor: blueGrey[50],
        flex: '1 1 auto',
    }),
    paper: () => ({
        padding: 20,
    }),
}));

const Router: FunctionComponent<RouterProps> = ({ userData, loading, error }) => {
    const classes = useStyles();

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);

    return (
        <BrowserRouter>
            <Header userData={userData} />
            <Box component="main" className={classes.main}>
                <Container>
                    {loading || error ? (
                        <Progress error={error} />
                    ) : (
                        <Paper square className={classes.paper}>
                            <Switch>
                                <Route exact path="/">
                                    <Redirect to="/recipes?category=all" />
                                </Route>
                                <Route path="/recipes">
                                    <Recipes />
                                </Route>
                                <Route path="/profile">
                                    <Profile />
                                </Route>
                                <Route path="/myRecipes">
                                    <MyRecipes />
                                </Route>
                                <Route path="/create">
                                    <Create />
                                </Route>
                                <Route>
                                    <NoMatch />
                                </Route>
                            </Switch>
                        </Paper>
                    )}
                </Container>
            </Box>
        </BrowserRouter>
    );
};

const mapStateToProps = (state: RootState) => ({
    userData: authSelectors.userData(state),
    loading: authSelectors.loading(state),
    error: authSelectors.error(state),
});

export default connect(mapStateToProps)(Router);
