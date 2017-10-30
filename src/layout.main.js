import { Redirect, Route, Switch } from "react-router-dom";

import ActivityFeed from "./page.activity-feed";
import AlertsConfiguration from "./page.alerts-configuration";
import GithubRepositoriesPage from "./page.github-repositories";
import { NotFound } from "./page.not-found";
import React from "react";

const Main = () => (
    <div className="main">
        <Switch>
            <Redirect exact from="/" to="feed" />
            <Route exact path="/feed" component={ActivityFeed} />
            <Route exact path="/alerts" component={AlertsConfiguration} />
            <Route exact path="/repositories" component={GithubRepositoriesPage} />
            <Route component={NotFound} />
        </Switch>
    </div>
)

export default Main;