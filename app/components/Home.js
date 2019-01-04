// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FolderIcon from '@material-ui/icons/Folder';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles';
import * as ProjectActions from '../actions/projects';

type Props = {
    classes: PropTypes.isRequired,
    openProject: PropTypes.func.isRequired
};

class _Home extends Component<Props> {
    props: Props;

    render() {
        const { classes, openProject } = this.props;

        return (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={openProject}
                >
                    <FolderIcon className={classes.buttonIconLeft} />
                    Open Folder
                </Button>
            </div>
        );
    }
}
const Home = withStyles(styles)(_Home);

function mapStateToProps(state) {
    return {
        editor: state.editor
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ProjectActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
