/**
 * @generated SignedSource<<0411ab216f792469c23bff0e143b9e35>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type StatsBarSubscription$variables = Record<PropertyKey, never>;
export type StatsBarSubscription$data = {
  readonly statsUpdated: {
    readonly peers: number;
    readonly portsAvailable: number;
    readonly torrents: number;
  };
};
export type StatsBarSubscription = {
  response: StatsBarSubscription$data;
  variables: StatsBarSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "SessionStats",
    "kind": "LinkedField",
    "name": "statsUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "torrents",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "peers",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "portsAvailable",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "StatsBarSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "StatsBarSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e8462f39b92383801adcee0eb5397419",
    "id": null,
    "metadata": {},
    "name": "StatsBarSubscription",
    "operationKind": "subscription",
    "text": "subscription StatsBarSubscription {\n  statsUpdated {\n    torrents\n    peers\n    portsAvailable\n  }\n}\n"
  }
};
})();

(node as any).hash = "ddd27cb1173aa4c7b69ff4ae7469558a";

export default node;
