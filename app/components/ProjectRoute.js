// @flow

import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

function ProjectRoute({ component: Component, project, render, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                project ? (
                    render(props)
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

function mapStateToProps(state) {
    return {
        project: state.project
    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectRoute);
