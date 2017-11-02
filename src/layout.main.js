import { Redirect, Route, Switch } from "react-router-dom";

import ActivityFeed from "./page.activity-feed";
import AlertsConfiguration from "./page.alerts-configuration";
import GithubRepositoriesPage from "./page.github-repositories";
import { NotFound } from "./page.not-found";
import React from "react";
import ValuesPage from "./page.values";
import styles from "./app.scss";

const Main = () => (
    <div className={styles.main}>
        <Switch>
            <Redirect exact from="/" to="values" />
            <Route exact path="/feed" component={ActivityFeed} />
            <Route exact path="/alerts" component={AlertsConfiguration} />
            <Route exact path="/repositories" component={GithubRepositoriesPage} />
            <Route exact path="/values" component={ValuesPage} />
            <Route component={NotFound} />
        </Switch>
    </div>
)

export default Main;
