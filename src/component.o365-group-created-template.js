// import PropTypes from "prop-types";

import React from "react";

const O365GroupCreatedTemplate = props => {
    const { activity } = props;

    return (
        <div>
            <h3>O365 Group Created</h3>
            <p>
                <span>{activity.userDisplayName}</span> has created a new {activity.extraData.o365GroupVisibility} group {activity.targetUrl}
            </p>
        </div>
    );
};

// O365GroupCreatedTemplate.propTypes = {
//     activity: PropTypes.shape({
//         extraData: PropTypes.shape({
//             o365GroupVisibility: PropTypes.string.isRequired,
//             targetUrl: PropTypes.string.isRequired
//         })
//     })
// }

export default O365GroupCreatedTemplate;