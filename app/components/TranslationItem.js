// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';

type Props = {
    onChange: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
};

export default class TranslationItem extends Component<Props> {
    props: Props;

    constructor(props: P) {
        super(props);
        this.props = props;

        this.state = {
            target: ''
        };

        this.timeOut = null;
    }

    componentDidMount() {
        const { target } = this.props.item;
        this.setState({ target });
    }

    componentDidUpdate(prevProps) {
        const { target } = this.props.item;

        if (prevProps.item.target !== target) {
            this.setState({ target });
        }
    }

    handleChange = event => {
        const target = event.target.value;

        this.setState({ target });

        if (this.timeOut) {
            clearTimeout(this.timeOut);
        }

        this.timeOut = setTimeout(() => {
            const { onChange } = this.props;
            onChange(target);
        }, 500);
    };

    render() {
        const { item } = this.props;
        const { target } = this.state;
        return (
            <TableRow>
                <TableCell scope="row" style={{ width: 300 }}>
                    {item.source}
                </TableCell>
                <TableCell align="right" item={item}>
                    <TextField
                        onChange={this.handleChange}
                        value={target}
                        fullWidth
                        multiline
                    />
                </TableCell>
            </TableRow>
        );
    }
}
