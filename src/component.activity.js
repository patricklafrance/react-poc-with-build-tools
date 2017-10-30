import React, { PureComponent } from "react";

import { ActivityType } from "./types";
import O365GroupCreatedTemplate from "./component.o365-group-created-template";
import PropTypes from "prop-types";
import SubsiteCreatedTemplate from "./component.subsite-created-template";
import _ from "lodash";
import o365GroupIcon from "./icon-o365group--circled.svg";
import subsitesIcon from "./icon-subsites--circled.svg";

const ActivityTemplates = {
    1: SubsiteCreatedTemplate,
    2: O365GroupCreatedTemplate
};

const ActivityIcons = {
    1: subsitesIcon,
    2: o365GroupIcon
};

export class Activity extends PureComponent {
    static propTypes = {
        activity: PropTypes.shape(ActivityType)
    }

    _getTemplateComponent() {
        const { activity } = this.props;
        const template = ActivityTemplates[activity.activitySubtype];

        if (_.isNil(template)) {
            throw new Error("Unknown activity feed item template.");
        }

        return template;
    }

    _getIcon() {
        const { activity } = this.props;
        const icon = ActivityIcons[activity.activitySubtype];

        if (_.isNil(icon)) {
            throw new Error("Unknown activity feed item icon.");
        }

        return icon;
    }

    render() {
        const { activity } = this.props;
        const Template = this._getTemplateComponent();
        
        return (
            <li className="activity-feed-item">
                <div>
                    <img src={this._getIcon()} alt="Icon" className="activity-feed-item-icon" />
                </div>
                <div>
                    <div><Template activity={activity} /></div>
                    <div>{activity.timestamp}</div>
                </div>
                <hr />
                <br /><br />
            </li>
        );
    }
}