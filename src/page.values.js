import React, { PureComponent } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    fetchValues
} from "./thunks.js";

class ValuesPage extends PureComponent {
    async componentWillMount() {
        const { actions } = this.props;

        await actions.fetchValues();
    }

    render() {
        const { values } = this.props;

        return (
            values.map(x => {
                return (
                    <div>{x}</div>
                )
            })
        );
    }
};

const mapStateToProps = state => {
    return {
        values: state.values.values
    };
};

// http://blog.isquaredsoftware.com/2016/10/idiomatic-redux-why-use-action-creators/
const mapDispatchToProps = dispatch => {
    // Turns an object whose values are action creators, into an object with the same keys,
    // but with every action creator wrapped into a dispatch call so they may be invoked directly.

    // The idea is that by pre-binding the action creators, the component you pass to connect()
    // technically "doesn't know" that it's connected - it just knows that it needs to run this.props.someCallback().
    // On the other hand, if you didn't bind action creators, and called this.props.dispatch(someActionCreator()), now the
    // component "knows" that it's connected because it's expecting props.dispatch to exist.
    return {
        actions: bindActionCreators({
            fetchValues
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ValuesPage);
