import React, { PureComponent } from "react";

import Alert from "./component.alert";
import { AlertType } from "./types";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import {
    fetchAlerts
} from "./thunks.js";

class AlertsConfiguration extends PureComponent {
    static propTypes = {
        alerts: PropTypes.arrayOf(PropTypes.shape(AlertType)).isRequired,
        actions: PropTypes.shape({
            fetchAlerts: PropTypes.func.isRequired
        })
    };

    componentWillMount() {
        const { actions } = this.props;

        actions.fetchAlerts();
    }

    render() {
        const { alerts, subscribedAlertsCount } = this.props;

        return (
            <div>
                <h1>This is the alerts configuration page!</h1>
                <div>Subscribed alerts: {subscribedAlertsCount} / {alerts.length}</div>
                <ul>
                {
                    alerts.map(x => {
                        return (
                            <Alert key={x.activityTypeId} alert={x} />
                        )
                    })
                }
                </ul>
            </div>
        );
    }
};

// Reselect memoize the result so we dont recompute the value everytime the component re-render
const getSubscribedAlertsCount = createSelector([state => state.alerts.alerts], alerts => {
    return alerts.filter(x => x.isSubscribed).length;
});

// Map state values to the component properties.
const mapStateToProps = state => {
    return {
        alerts: state.alerts.alerts,
        subscribedAlertsCount: getSubscribedAlertsCount(state)
    };
};

// http://blog.isquaredsoftware.com/2016/10/idiomatic-redux-why-use-action-creators/
const mapDispatchToProps = dispatch => {
    // Turns an object whose values are action creators, into an object with the same keys, 
    // but with every action creator wrapped into a dispatch call so they may be invoked directly.

    // The idea is that by pre-binding the action creators, the component you pass to connect() 
    // technically "doesn't know" that it's connected - it just knows that it needs to run this.props.someCallback().
    // On the other hand, if you didn't bind action creators, and called this.props.dispatch(someActionCreator()), now the
    // component "knows" that it's connected because it's expecting props.dispatch to exist.
    return {
        actions: bindActionCreators({
            fetchAlerts
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertsConfiguration);