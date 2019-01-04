// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';
import { styles } from '../styles';
import * as EditorActions from '../actions/editor';
import { isSaving as editorIsSaving } from '../selectors/editor';

type Props = {
    classes: PropTypes.isReuqired,
    domainId: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    changeFilter: PropTypes.func.isRequired,
    match: {
        params: {
            domainId: PropTypes.string.isRequired,
            locale: PropTypes.string.isRequired
        }
    },
    isSaving: PropTypes.bool
};

class _EditViewToolbarContents extends Component<Props> {
    props: Props;

    constructor(props: Props) {
        super(props);

        this.state = {
            filter: ''
        };
    }

    handleSave = () => {
        const { domainId, locale } = this.props.match.params;
        const { onSave } = this.props;

        onSave(domainId, locale);
    };

    renderSave() {
        const { classes, isSaving } = this.props;
        const success = false;

        return (
            <IconButton
                className={classes.menuButton}
                onClick={this.handleSave}
                color="inherit"
                aria-label="Open drawer"
            >
                {success ? <CheckIcon /> : <SaveIcon />}
                {isSaving && (
                    <CircularProgress className={classes.fabProgress} />
                )}
            </IconButton>
        );
    }

    handleChangeFilter = event => {
        const filter = event.target.value;

        this.setState({ filter });

        if (this.timeOut) {
            clearTimeout(this.timeOut);
        }

        this.timeOut = setTimeout(() => {
            const { changeFilter } = this.props;
            changeFilter(filter);
        }, 1000);
    };

    render() {
        const { classes } = this.props;
        const { domainId, locale } = this.props.match.params;

        return (
            <React.Fragment>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                    Domain: {domainId} Locale: {locale}
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput
                        }}
                        value={this.state.filter}
                        onChange={this.handleChangeFilter}
                    />
                </div>
                {this.renderSave()}
            </React.Fragment>
        );
    }
}

const EditViewToolbarContents = withStyles(styles)(_EditViewToolbarContents);

function mapStateToProps(state, ownProps) {
    return {
        isSaving: editorIsSaving(
            state,
            ownProps.match.params.domainId,
            ownProps.match.params.locale
        )
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSave: (domain, locale) =>
            dispatch(EditorActions.saveDomainLocale(domain, locale)),
        changeFilter: filter => dispatch(EditorActions.changeFilter(filter))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditViewToolbarContents);
