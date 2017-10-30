import React, { PureComponent } from "react";
import {
    fetchActivities,
    fetchActivitiesFailed,
    fetchActivitiesSucceeded
} from "./actions.js";

import { Activity } from "./component.activity";
import { ActivityType } from "./types";
import { HttpService } from "./http-service";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const Loading = () => (
    <div>Loading...</div>
);

const ActivityList = props => {
    const { activities } = props;

    return (
        <ul>
        {
            activities.map(x => {
                return (
                    <Activity key={x.eventId} activity={x} />
                )
            })
        }
        </ul>
    )
};

class ActivityFeed extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        activities: PropTypes.arrayOf(PropTypes.shape(ActivityType)).isRequired,
        actions: PropTypes.shape({
            fetchActivities: PropTypes.func.isRequired,
            fetchActivitiesFailed: PropTypes.func.isRequired,
            fetchActivitiesSucceeded: PropTypes.func.isRequired
        })
    };

    _httpService = null;

    constructor(props) {
        super(props);

        this._httpService = new HttpService();
    }

    componentWillMount() {
        const { fetchActivities, fetchActivitiesSucceeded } = this.props;

        fetchActivities();

        const newActivities = this._httpService.get({ url: "/activities" });

        fetchActivitiesSucceeded(newActivities.items);
    }

    render() {
        const { isLoading, activities } = this.props;

        return (
            <div>
                <h1>This is the activity feed page!</h1>
                {
                    isLoading ? <Loading /> : <ActivityList activities={activities} />
                }
            </div>
        );
    }
};

// Map state values to the component properties.
const mapStateToProps = state => {
    return {
        isLoading: state.feed.isLoading,
        activities: state.feed.activities
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
    return bindActionCreators({
        fetchActivities,
        fetchActivitiesFailed,
        fetchActivitiesSucceeded
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityFeed);