// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import TranslationItem from '../components/TranslationItem';
import { styles } from '../styles';
import * as EditorActions from '../actions/editor';
import { selectOpenedFilteredItems } from '../selectors/domains';
import { selectEditorFilter } from '../selectors/editor';

type Props = {
    classes: PropTypes.isRequired,
    domainId: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    domain: PropTypes.isRequired,
    items: PropTypes.array.isRequred,
    loadDomain: PropTypes.func.isRequired,
    changeDomainLocaleTarget: PropTypes.func.isRequired,
    changeFilter: PropTypes.func.isRequired
};

class _EditView extends Component<Props> {
    props: Props;

    componentDidMount() {
        const { loadDomain, domainId, domain } = this.props;

        if (!domain) {
            loadDomain(domainId);
        }
    }

    handleChange = (itemId, value) => {
        const { changeDomainLocaleTarget, domainId, locale } = this.props;
        changeDomainLocaleTarget(domainId, locale, itemId, value);
    };

    handleChangeFilter = filter => {
        const { changeFilter } = this.props;
        changeFilter(filter);
    };

    render() {
        const { classes, items, domain } = this.props;

        if (!domain) {
            return <CircularProgress className={classes.progress} />;
        }

        return (
            <div>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: 300 }}>Source</TableCell>
                            <TableCell>Target</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(item => (
                            <TranslationItem
                                key={item.id}
                                item={item}
                                onChange={value =>
                                    this.handleChange(item.id, value)
                                }
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

const EditView = withStyles(styles)(_EditView);

function mapStateToProps(state, ownProps) {
    return {
        editor: state.editor,
        domain: state.domains[ownProps.domainId],
        items: selectOpenedFilteredItems(state),
        filter: selectEditorFilter(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(EditorActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditView);
