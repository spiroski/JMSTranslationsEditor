// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from '../styles';

type Props = {
    children: React.Node,
    classes: PropTypes.required
};

class App extends React.Component<Props> {
    props: Props;

    render() {
        const { children, classes } = this.props;
        return (
            <Paper className={classes.root}>
                <CssBaseline />
                {children}
            </Paper>
        );
    }
}

export default withStyles(styles)(App);
