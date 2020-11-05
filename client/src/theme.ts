import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import brown from '@material-ui/core/colors/brown';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[700],
        },
        secondary: {
            main: brown[400],
        },
    },
});

export default theme;
