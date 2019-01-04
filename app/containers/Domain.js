// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { styles } from '../styles';
import * as EditorActions from '../actions/editor';

type Props = {
    classes: PropTypes.isRequired,
    domainId: PropTypes.string.isRequired,
    domain: PropTypes.object.isRequired,
    loadDomain: PropTypes.func.isRequired,
    openDomainLocale: PropTypes.func.isRequired
};

class _Domain extends Component<Props> {
    props: Props;

    state: {
        loadingDomains: {}
    };

    componentDidMount() {
        this.loadCurrentDomain();
    }

    componentDidUpdate() {
        this.loadCurrentDomain();
    }

    loadCurrentDomain = () => {
        const { loadDomain, domainId, domain } = this.props;

        if (domain) {
            return;
        }

        loadDomain(domainId);
    };

    render() {
        const { classes, domainId, domain, openDomainLocale } = this.props;

        if (!domain) {
            return <CircularProgress className={classes.progress} />;
        }

        return (
            <List>
                {domain
                    ? domain.locales.map(locale => (
                          <ListItem
                              button
                              key={locale}
                              onClick={() => openDomainLocale(domainId, locale)}
                          >
                              {locale}
                          </ListItem>
                      ))
                    : null}
            </List>
        );
    }
}

const Domain = withStyles(styles)(_Domain);

function mapStateToProps(state, ownProps) {
    return {
        editor: state.editor,
        domain: state.domains[ownProps.domainId]
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(EditorActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Domain);
