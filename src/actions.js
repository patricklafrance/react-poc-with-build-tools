import * as actionTypes from "./action-types";

/*******************************
 Activity Feed
*******************************/
export function fetchActivities() {
    return {
        type: actionTypes.FetchActivities
    };
}

export function fetchActivitiesSucceeded(activities) {
    return {
        type: actionTypes.FetchActivitiesSucceeded,
        activities
    };
}

export function fetchActivitiesFailed(errorMessage) {
    return {
        type: actionTypes.FetchActivitiesFailed,
        errorMessage
    }
}

/*******************************
 Alerts
*******************************/
export function fetchAlertsRequest() {
    return {
        type: actionTypes.FetchAlertsRequest
    };
}

export function fetchAlertsSucceeded(alerts) {
    return {
        type: actionTypes.FetchAlertsSucceeded,
        alerts
    };
}

export function fetchAlertsFailed(errorMessage) {
    return {
        type: actionTypes.FetchAlertsFailed,
        errorMessage
    };
}

export function subscribeToAlert(activityTypeId) {
    return {
        type: actionTypes.SubscribeToAlert,
        activityTypeId
    };
}

export function unsubscribeFromAlert(activityTypeId) {
    return {
        type: actionTypes.UnsubscribeFromAlert,
        activityTypeId
    };
}

/*******************************
 Github repositories
*******************************/
export function fetchRepositoriesRequest() {
    return {
        type: actionTypes.FetchRepositoriesRequest
    };
}

export function fetchRepositoriesSucceeded(repositories) {
    return {
        type: actionTypes.FetchRepositoriesSucceeded,
        repositories
    };
}

export function fetchRepositoriesFailed(errorMessage) {
    return {
        type: actionTypes.FetchRepositoriesFailed,
        errorMessage
    }
}

/*******************************
 Notifications
*******************************/
export function showUnmanagedErrors(error) {
    return {
        type: actionTypes.ShowUnmanagedError,
        error
    };
}

export function hideUnmanagedErrors(error) {
    return {
        type: actionTypes.HideUnmanagedError
    };
}