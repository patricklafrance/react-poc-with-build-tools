import React, { Component } from "react";

import PropTypes from "prop-types";
import styles from "./app.scss";

export class Toggle extends Component {
    static propTypes = {
        value: PropTypes.bool.isRequired,
        name: PropTypes.string,
        onChanged: PropTypes.func.isRequired
    };

    static defaultProps = {
        value: false,
        name: "toggle"
    };

    timestamp = Date.now();

    _toggleElement = null;

    componentDidMount() {
        this._toggleElement.checkbox();
    }

    componentWillUnmount() {
        this._toggleElement.checkbox("destroy");
    }

    handleChange = event => {
        const { onChanged } = this.props;

        onChanged(!this.props.value);
    };

    handleToggleRef(element) {
        // eslint-disable-next-line
        this._toggleElement = $(element);
    };

    render() {

        const { name, value } = this.props;

        return (
            <div className="ui toggle checkbox">
                <input type="checkbox"
                       name={name}
                       defaultChecked={value}
                       onChange={this.handleChange}
                       // Cannot use an arrow function because of the following issue: https://github.com/gaearon/react-hot-loader/issues/537
                       ref={this.handleToggleRef.bind(this)} />
                <label></label>
            </div>
        )
    }
};
