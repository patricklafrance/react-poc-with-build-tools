import React, { Component } from "react";

import PropTypes from "prop-types";

export class Toggle extends Component {
    static propTypes = {
        isChecked: PropTypes.bool.isRequired,
        name: PropTypes.string,
        onChanged: PropTypes.func.isRequired
    };

    static defaultProps = {
        isChecked: false,
        name: "toggle"
    };

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

    handleToggleRef = element => {
        // eslint-disable-next-line
        this._toggleElement = $(element);
    };

    render() {
        const { name, isChecked } = this.props;

        return (
            <div className="ui toggle checkbox">
                <input type="checkbox" 
                       name={name}
                       defaultChecked={isChecked}
                       onChange={this.handleChange} 
                       ref={this.handleToggleRef} />
                <label></label>
            </div>
        )
    }
};