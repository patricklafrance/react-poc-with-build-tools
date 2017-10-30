import _ from "lodash";

// export async function get(instructions) {
//     let url = instructions.url;

//     if (!_.isNil(instructions.params)) {
//         url = `${url}?${convertParamsToUrlParameters(instructions.params)}`;
//     }

//     // https://github.github.io/fetch/#options
//     const data = await (await fetch(url, { method: "GET" })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//             else {
//                 // 4xx or 5xx and errors.
//                 const error = new Error(response.statusText);
//                 error.response = response;

//                 throw error;
//             }
//         })
//         .catch(() => {
//             // Network errors.
//         }));

//     return data;

//     // throw new Error("HA HA!");
// }

// function convertParamsToUrlParameters(params) {
//     return Object
//         .keys(params)
//         .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//         .join("&");
// }

export class FetchClient {
    async get(instructions) {
        let url = instructions.url;

        if (!_.isNil(instructions.params)) {
            url = `${url}?${this._convertParamsToUrlParameters(instructions.params)}`;
        }

        // https://github.github.io/fetch/#options
        const data = await (await fetch(url, { method: "GET" })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    // 4xx or 5xx and errors.
                    const error = new Error(response.statusText);
                    error.response = response;

                    throw error;
                }
            })
            .catch(() => {
                throw new Error("Unknown network errors happened, bla bla et bla!");
                // Network errors.
            }));

        return data;

        // throw new Error("HA HA!");
    }

    _convertParamsToUrlParameters(params) {
        return Object
            .keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join("&");
    }
}
