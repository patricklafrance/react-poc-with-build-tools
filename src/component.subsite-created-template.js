import React from "react";

const SubsiteCreatedTemplate = props => {
    const { activity } = props;

    return (
        <div>
            <h3>Subsite Created</h3>
            <p>
                <span>{activity.userDisplayName}</span> has created site {activity.extraData.subsiteDisplayName} in {activity.siteCollectionDisplayName}
            </p>
        </div>
    );
};

export default SubsiteCreatedTemplate;