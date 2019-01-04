import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import Domain from './containers/Domain';
import EditView from './containers/EditView';
import Editor from './containers/Editor';
import ProjectRoute from './components/ProjectRoute';

export default () => (
    <App>
        <Switch>
            <ProjectRoute
                path={routes.EDITOR}
                render={({ match }) => (
                    <Editor {...match.params}>
                        <Switch>
                            <Route
                                path={routes.EDIT}
                                render={({ match: m }) => (
                                    <EditView {...m.params} />
                                )}
                            />
                            <Route
                                path={routes.DOMAIN}
                                render={({ match: m }) => (
                                    <Domain {...m.params} />
                                )}
                            />
                        </Switch>
                    </Editor>
                )}
            />
            <Route path={routes.HOME} component={HomePage} />
        </Switch>
    </App>
);
