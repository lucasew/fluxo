import {
  Environment,
  Network,
  RecordSource,
  Store,
  Observable,
  RequestParameters,
  Variables,
  GraphQLResponse,
} from 'relay-runtime'
import { createClient } from 'graphql-ws'

/**
 * WebSocket client specifically purposed for handling GraphQL subscriptions.
 *
 * It defaults to connecting to the backend GraphQL endpoint over WS. Unlike HTTP requests,
 * subscriptions keep a persistent connection open, letting the backend stream real-time updates
 * to the frontend regarding torrent states and speeds.
 */
const wsClient = createClient({
  url: `ws://${window.location.host}/graphql`,
})

/**
 * Handles standard GraphQL operations (Queries and Mutations) by sending an HTTP POST request
 * to the API server. This uses the native `fetch` API.
 *
 * @param params Contains the parsed GraphQL query text provided by Relay
 * @param variables The variables to be injected into the query/mutation
 * @returns A promise resolving to the GraphQL execution result
 */
async function fetchQuery(
  params: RequestParameters,
  variables: Variables,
): Promise<GraphQLResponse> {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  })

  return await response.json()
}

/**
 * Executes GraphQL Subscriptions over WebSockets using the `graphql-ws` protocol.
 *
 * It wraps the `graphql-ws` client in a Relay `Observable`, allowing Relay's store to automatically
 * process incoming messages, handle errors, and trigger UI updates reactively.
 *
 * @param request Contains the text of the subscription query
 * @param variables The variables for the subscription
 * @returns A stream (Observable) emitting GraphQL responses
 */
function subscribe(
  request: RequestParameters,
  variables: Variables,
): Observable<GraphQLResponse> {
  return Observable.create((sink) => {
    return wsClient.subscribe(
      {
        query: request.text!,
        variables,
      },
      {
        next: sink.next,
        error: sink.error,
        complete: sink.complete,
      },
    )
  })
}

/**
 * The Relay Environment encapsulates the application's configuration, including the
 * network layer and the in-memory cache (Store).
 *
 * The `network` layer is split into two transports based on operation type:
 * - Queries and Mutations use traditional HTTP POST (`fetchQuery`)
 * - Subscriptions use WebSockets (`subscribe`) for push-based real-time updates
 */
export const environment = new Environment({
  network: Network.create(fetchQuery, subscribe),
  store: new Store(new RecordSource()),
})
