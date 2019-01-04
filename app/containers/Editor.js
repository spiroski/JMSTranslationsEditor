// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DomainPicker from './DomainPicker';
import { styles } from '../styles';
import * as EditorActions from '../actions/editor';
import MainAppBar from './MainAppBar';

type Props = {
    classes: PropTypes.required,
    children: PropTypes.any,
    openDomain: PropTypes.func.isRequired,
    listDomains: PropTypes.func.isRequired,
    editor: PropTypes.isRequired
};

class _Editor extends Component<Props> {
    props: Props;

    state = {
        open: true
    };

    componentDidMount(): void {
        this.listDomains();
    }

    componentDidUpdate(prevProps) {
        const { project } = this.props;
        if (prevProps.project.path !== project.path) {
            this.listDomains();
        }
    }

    listDomains = () => {
        const { listDomains } = this.props;

        listDomains();
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, children, domainId, locale, editor } = this.props;
        const { open } = this.state;

        return (
            <React.Fragment>
                <MainAppBar
                    {...{
                        classes,
                        open,
                        onOpen: this.handleDrawerOpen,
                        domainId,
                        locale
                    }}
                />
                <DomainPicker
                    {...{
                        classes,
                        domainId,
                        editor,
                        open,
                        onClose: this.handleDrawerClose
                    }}
                />
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open
                    })}
                >
                    <div className={classes.appBarSpacer} />
                    {children}
                </main>
            </React.Fragment>
        );
    }
}

const Editor = withStyles(styles)(_Editor);

function mapStateToProps(state) {
    return {
        editor: state.editor,
        project: state.project
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(EditorActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor);
