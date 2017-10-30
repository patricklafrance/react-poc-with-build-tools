import PropTypes from "prop-types";

export const Repositorytype = {
    name: PropTypes.string.isRequired
};

export const AlertType = {
    activityTypeId: PropTypes.string.isRequired,
    alertSubscriptionId: PropTypes.string.isRequired,
    tenantId: PropTypes.string.isRequired,
    recipientEmail: PropTypes.string.isRequired,
    userPrincipalName: PropTypes.string.isRequired,
    isSubscribed: PropTypes.bool
};

export const ActivityType = {
    timestamp: PropTypes.string.isRequired,
    eventId: PropTypes.string.isRequired,
    activitySubtype: PropTypes.number.isRequired,
    targetUrl: PropTypes.string.isRequired,
    siteCollectionUrl: PropTypes.string.isRequired,
    siteCollectionDisplayName: PropTypes.string.isRequired,
    userPrincipalName: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    userDisplayName: PropTypes.string.isRequired,
    extraData: PropTypes.object
};

export const UnmanagedErrorType = {
    message: PropTypes.string.isRequired
};

