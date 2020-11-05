import React, { FunctionComponent, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Paper } from '@material-ui/core';
import { RootState } from '../redux/rootReducer';
import authSelectors from '../redux/auth/authSelectors';
import { UserData } from '../redux/auth/authInterfaces';
import Header from './Header';
import NoMatch from './NoMatch';

interface RouterProps {
    userData: UserData;
}

const Router: FunctionComponent<RouterProps> = ({ userData }) => {
    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);

    return (
        <BrowserRouter>
            <Header userData={userData} />
            <main>
                <Container>
                    <Paper>
                        <Switch>
                            <Route exact path="/" />
                            <Route>
                                <NoMatch />
                            </Route>
                        </Switch>
                    </Paper>
                </Container>
            </main>
        </BrowserRouter>
    );
};

const mapStateToProps = (state: RootState) => ({
    userData: authSelectors.userData(state),
});

export default connect(mapStateToProps)(Router);
