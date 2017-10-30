import React, { PureComponent } from "react";

import PropTypes from "prop-types";
import { UnmanagedErrorType } from "./types";
import _ from "lodash";
import { connect } from "react-redux";

// TODO: si null, retourner false?

class UnmanagedErrorNotification extends PureComponent {
    static propTypes = {
        error: PropTypes.shape(UnmanagedErrorType)
    };

    render() {
        const { error } = this.props;

        if (_.isNil(error)) {
            return false;
        }

        return (
            <div className="unmanaged-error-notification">
                {error.message}
            </div>
        );
    }
};

// Map state values to the component properties.
const mapStateToProps = state => {
    return {
        error: state.notifications.unmanagedError
    };
};

export default connect(mapStateToProps, null)(UnmanagedErrorNotification);

