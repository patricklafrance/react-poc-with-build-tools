import React, { PureComponent } from "react";

import PropTypes from "prop-types";
import { Repositorytype } from "./types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    fetchRepositories
} from "./thunks.js";

const Loading = () => (
    <div>Loading...</div>
);

const RepositoryList = props => {
    const { repositories } = props;

    return (
        <ul>
        {
            repositories.map(x => {
                return (
                    <li key={x.id}>
                        <span>{x.name}</span>
                    </li>
                )
            })
        }
        </ul>
    )
};

export class GithubRepositoriesPage extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        repositories: PropTypes.arrayOf(PropTypes.shape(Repositorytype)).isRequired,
        actions: PropTypes.shape({
            fetchRepositories: PropTypes.func.isRequired
        })
    };

    async componentWillMount() {
        const { actions } = this.props;

        // Can react to the result of the action if we want to. Useless in this case, this is an example.
        try {
            await actions.fetchRepositories();

            console.log("Success!");
        }
        catch (error) {
            console.log("Failed!");
        }
    }

    render() {
        const { isLoading, repositories } = this.props;

        return (
            <div>
                <h1>This is the github repositories page!</h1>
                {
                    isLoading ? <Loading /> : <RepositoryList repositories={repositories} />
                }
            </div>
        );
    }
};

// Map state values to the component properties.
const mapStateToProps = state => {
    return {
        isLoading: state.repositories.isLoading,
        repositories: state.repositories.repositories
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
            fetchRepositories
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GithubRepositoriesPage);