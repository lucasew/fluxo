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

// WebSocket client for subscriptions
const wsClient = createClient({
  url: `ws://${window.location.host}/graphql`,
})

// HTTP fetch for queries and mutations
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

// WebSocket subscription
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

// Create Relay environment
export const environment = new Environment({
  network: Network.create(fetchQuery, subscribe),
  store: new Store(new RecordSource()),
})
