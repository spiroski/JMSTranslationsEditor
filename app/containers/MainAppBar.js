// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/es/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { styles } from '../styles';
import routes from '../constants/routes';
import EditViewToolbarContents from './EditViewToolbarContents';

type Props = {
    classes: PropTypes.isReuqired,
    open: PropTypes.boolean,
    onOpen: PropTypes.func.isRequired
};

class _MainAppBar extends Component<Props> {
    props: Props;

    render() {
        const { classes, open, onOpen } = this.props;

        return (
            <AppBar
                position="fixed"
                className={classNames(
                    classes.appBar,
                    open && classes.appBarShift
                )}
            >
                <Toolbar disableGutters={!open} className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={onOpen}
                        className={classNames(
                            classes.menuButton,
                            open && classes.menuButtonHidden
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Switch>
                        <Route
                            path={routes.EDIT}
                            component={EditViewToolbarContents}
                        />
                    </Switch>
                </Toolbar>
            </AppBar>
        );
    }
}

const MainAppBar = withStyles(styles)(_MainAppBar);

export default MainAppBar;
