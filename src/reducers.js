import * as actionTypes from "./action-types";

/*******************************
 Activity Feed
*******************************/
const ActivityFeedDefaultState = {
    isLoading: true,
    activities: [],
    errorMessage: ""
};

const handleFetchActivities = (state, action) => {
    return {
        ...state,
        isLoading: true
    };
};

const handleFetchActivitiesSucceeded = (state, action) => {
    return {
        ...state,
        isLoading: false,
        activities: Array.from(action.activities)
    };
};

const handleFetchActivitiesFailed = (state, action) => {
    return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage
    };
};

const activityFeedRootReducer = (state = ActivityFeedDefaultState, action) => {
    switch (action.type) {
        case actionTypes.FetchActivities:
            return handleFetchActivities(state, action);
        case actionTypes.FetchActivitiesSucceeded:
            return handleFetchActivitiesSucceeded(state, action);
        case actionTypes.FetchActivitiesFailed:
            return handleFetchActivitiesFailed(state, action);
        default:
            return state;
    }
};

/*******************************
 Alerts
*******************************/
const AlertsConfigurationDefaultState = {
    alerts: [],
    errorMessage: ""
};

const handleFetchAlertsRequest = (state, action) => {
    return { ...state };
};

const handleFetchAlertsSucceeded = (state, action) => {
    return {
        ...state,
        alerts: Array.from(action.alerts)
    };
};

const handleFetchAlertsFailed = (state, action) => {
    return {
        ...state,
        errorMessage: action.errorMessage
    };
};

const handleSubscribeToAlert = (state, action) => {
    return {
        ...state,
        alerts: state.alerts.map(x => x.activityTypeId === action.activityTypeId 
            ? { ...x, isSubscribed: true } 
            : x)
    };
};

const handleUnsubscribeFromAlert = (state, action) => {
    return {
        ...state,
        alerts: state.alerts.map(x => x.activityTypeId === action.activityTypeId 
            ? { ...x, isSubscribed: false } 
            : x)
    };
};

const alertsConfigurationRootReducer = (state = AlertsConfigurationDefaultState, action) => {
    switch (action.type) {
        case actionTypes.FetchAlertsRequest:
            return handleFetchAlertsRequest(state, action);
        case actionTypes.FetchAlertsSucceeded:
            return handleFetchAlertsSucceeded(state, action);
        case actionTypes.FetchAlertsFailed:
            return handleFetchAlertsFailed(state, action);
        case actionTypes.SubscribeToAlert:
            return handleSubscribeToAlert(state, action);
        case actionTypes.UnsubscribeFromAlert:
            return handleUnsubscribeFromAlert(state, action);
        default:
            return state;
    }
};

/*******************************
 Github repositories
*******************************/
const GithubRepositoriesDefaultState = {
    repositories: [],
    isLoading: false
};

const handleFetchRepositoriesRequest = (state, action) => {
    return { 
        ...state,
        isLoading: true
     };
};

const handleFetchRepositoriesSucceeded = (state, action) => {
    return {
        ...state,
        isLoading: false,
        repositories: Array.from(action.repositories)
    };
};

const handleFetchRepositoriesFailed = (state, action) => {
    return {
        ...state,
        isLoading: false
    };
};

const githubRepositoriesRootReducer = (state = GithubRepositoriesDefaultState, action) => {
    switch (action.type) {
        case actionTypes.FetchRepositoriesRequest:
            return handleFetchRepositoriesRequest(state, action);
        case actionTypes.FetchRepositoriesSucceeded:
            return handleFetchRepositoriesSucceeded(state, action);
        case actionTypes.FetchRepositoriesFailed:
            return handleFetchRepositoriesFailed(state, action);
        default:
            return state;
    }
};

/*******************************
 Notifications
*******************************/
const NotificationsDefaultState = {
    unmanagedError: null
};

const handleShowUnmanagedErrorReducer = (state, action) => {
    return {
        ...state,
        unmanagedError: {
            message: action.error
        }
    };
};

const handleHideUnmanagedErrorReducer = (state, action) => {
    return {
        ...state,
        unmanagedError: null
    };
};

const notificationsRootReducer = (state = NotificationsDefaultState, action) => {
    switch (action.type) {
        case actionTypes.ShowUnmanagedError:
            return handleShowUnmanagedErrorReducer(state, action);
        case actionTypes.HideUnmanagedError:
            return handleHideUnmanagedErrorReducer(state, action);
        default:
            return state;
    }
};

/*******************************
 Export
*******************************/
export const reducers = {
    feed: activityFeedRootReducer,
    alerts: alertsConfigurationRootReducer,
    repositories: githubRepositoriesRootReducer,
    notifications: notificationsRootReducer
};