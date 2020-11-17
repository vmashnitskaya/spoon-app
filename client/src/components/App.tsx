import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import theme from '../theme';
import Router from './Router';

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Router />
        </MuiThemeProvider>
    );
}

export default App;
