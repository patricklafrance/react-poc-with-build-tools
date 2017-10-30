/*******************************
 Activity Feed
*******************************/
const ActivityFeedNamespace = "ACTIVITY_FEED";

export const FetchActivities = `${ActivityFeedNamespace}/FETCH_ACTIVITIES`;
export const FetchActivitiesSucceeded = `${ActivityFeedNamespace}/FETCH_ACTIVITIES_SUCCEEDED`;
export const FetchActivitiesFailed = `${ActivityFeedNamespace}/FETCH_ACTIVITIES_FAILED`;

/*******************************
 Alerts
*******************************/
const AlertsConfigurationNamespace = "ALERTS_CONFIGURATION";

export const FetchAlertsRequest = `${AlertsConfigurationNamespace}/FETCH_ALERTS_REQUEST`;
export const FetchAlertsSucceeded = `${AlertsConfigurationNamespace}/FETCH_ALERTS_SUCCEEDED`;
export const FetchAlertsFailed = `${AlertsConfigurationNamespace}/FETCH_ALERTS_FAILED`;
export const SubscribeToAlert = `${AlertsConfigurationNamespace}/SUBSCRIBE_TO_ALERT`;
export const UnsubscribeFromAlert = `${AlertsConfigurationNamespace}/UNSUBSCRIBE_FROM_ALERT`;

/*******************************
 Github repositories
*******************************/
const GithubRepositoriesNamespace = "GITHUB_REPOSITORIES";

export const FetchRepositoriesRequest = `${GithubRepositoriesNamespace}/FETCH_REPOSITORIES_REQUEST`;
export const FetchRepositoriesSucceeded = `${GithubRepositoriesNamespace}/FETCH_REPOSITORIES_SUCCEEDED`;
export const FetchRepositoriesFailed = `${GithubRepositoriesNamespace}/FETCH_REPOSITORIES_FAILED`;

/*******************************
 Github repositories
*******************************/
const NotificationsNamespace = "NOTIFICATIONS";

export const ShowUnmanagedError = `${NotificationsNamespace}/SHOW_UNMANAGED_ERROR`;
export const HideUnmanagedError = `${NotificationsNamespace}/HIDE_UNMANAGED_ERROR`;