import React, { PureComponent } from "react";
import {
    subscribeToAlert,
    unsubscribeFromAlert
} from "./actions.js";

import { AlertType } from "./types";
import PropTypes from "prop-types";
import { Toggle } from "./component.toggle";
import { bindActionCreators } from "redux";
import classNames from "classnames";
import { connect } from "react-redux";

class Alert extends PureComponent {
    static propTypes = {
        alert: PropTypes.shape(AlertType).isRequired,
        actions: PropTypes.shape({
            subscribeToAlert: PropTypes.func.isRequired,
            unsubscribeFromAlert: PropTypes.func.isRequired
        })
    };

    handleToggleChanged = () => {
        const { alert, actions } = this.props;

        if (!alert.isSubscribed) {
            actions.subscribeToAlert(alert.activityTypeId);
        }
        else {
            actions.unsubscribeFromAlert(alert.activityTypeId);
        }
    };

    render() {
        const { alert } = this.props;

        return (
            <li className={classNames({ "alert--is-active": alert.isSubscribed })}>
                <h3>{alert.activityTypeId}</h3>
                <span>{alert.recipientEmail}</span>
                <Toggle value={alert.isSubscribed} onChanged={this.handleToggleChanged}  />
                <hr />
            </li>
        );
    }
};

const mapDispatchToProps = dispatch => {
    // Turns an object whose values are action creators, into an object with the same keys, 
    // but with every action creator wrapped into a dispatch call so they may be invoked directly.

    // The idea is that by pre-binding the action creators, the component you pass to connect() 
    // technically "doesn't know" that it's connected - it just knows that it needs to run this.props.someCallback().
    // On the other hand, if you didn't bind action creators, and called this.props.dispatch(someActionCreator()), now the
    // component "knows" that it's connected because it's expecting props.dispatch to exist.
    return {
        actions: bindActionCreators({
            subscribeToAlert,
            unsubscribeFromAlert
        }, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(Alert);