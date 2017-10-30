import {
    fetchAlertsRequest,
    fetchAlertsSucceeded,
    fetchRepositoriesFailed,
    fetchRepositoriesRequest,
    fetchRepositoriesSucceeded,
    hideUnmanagedErrors,
    showUnmanagedErrors
} from "./actions";

import { FetchClient } from "./fetch-service";
import { HttpService } from "./http-service";

/*******************************
 Helpers
*******************************/
const handleErrorsDecorator = next => {
    return async (dispatch, getState) => {
        try {
            const result = await next(dispatch, getState);

            return result;
        }
        catch (error) {
            dispatch(showUnmanagedError(error.message));
        }
    };
};

/*******************************
 Activity Feed
*******************************/

/*******************************
 Alerts Configuration
*******************************/

export function fetchAlerts() {
    return dispatch => {
        const httpService = new HttpService();
        
        dispatch(fetchAlertsRequest());
            
        const newAlerts = httpService.get({ url: "/alerts" }).map(x => {
            return {
                ...x,
                isSubscribed: false
            };
        })
        
        dispatch(fetchAlertsSucceeded(newAlerts));
    };
}

/*******************************
 Github Repositories
*******************************/
export function fetchRepositories() {
    return handleErrorsDecorator(async (dispatch, getState) => {
        const client = new FetchClient();
        const state = getState();

        if (!state.repositories.isLoading) {
            dispatch(fetchRepositoriesRequest());
            
            try {
                const data = await client.get({
                    url: "https://api.github.com/search/repositories",
                    params: {
                        q: "test"
                    }
                });
    
                dispatch(fetchRepositoriesSucceeded(data.items));
            }
            catch (error) {
                dispatch(fetchRepositoriesFailed());

                throw error;
            }
        }
    });
}

/*******************************
 Notifications
*******************************/
export function showUnmanagedError(error) {
    return async dispatch => {
        dispatch(showUnmanagedErrors(error));

        // Really dummy implementation, multiple cases are not covered.
        setTimeout(() => {
            dispatch(hideUnmanagedErrors());
        }, 4 * 1000);
    };
}