// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import FileIcon from '@material-ui/icons/Description';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import classNames from 'classnames';
import { styles } from '../styles';
import * as EditorActions from '../actions/editor';
import { selectDomains } from '../selectors/domains';

type Props = {
    classes: PropTypes.required,
    openDomain: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.boolean,
    editor: PropTypes.isRequired,
    domainId: PropTypes.string
};

class _DomainPicker extends Component<Props> {
    props: Props;

    renderDomains = () => {
        const { openDomain, editor, domainId } = this.props;

        const availableDomains =
            editor && editor.availableDomains ? editor.availableDomains : [];

        return (
            <List>
                {availableDomains.map(domain => (
                    <ListItem
                        key={domain}
                        button
                        selected={domainId === domain}
                        onClick={() => openDomain(domain)}
                    >
                        <ListItemIcon>
                            <FileIcon />
                        </ListItemIcon>
                        <ListItemText>{domain}</ListItemText>
                    </ListItem>
                ))}
            </List>
        );
    };

    render() {
        const { classes, open, onClose } = this.props;

        return (
            <Drawer
                variant="persistent"
                className={classes.drawer}
                anchor="left"
                classes={{
                    paper: classNames(classes.drawerPaper)
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={onClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                {this.renderDomains()}
            </Drawer>
        );
    }
}

const DomainPicker = withStyles(styles)(_DomainPicker);

function mapStateToProps(state) {
    return {
        editor: state.editor,
        domains: selectDomains(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(EditorActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DomainPicker);
