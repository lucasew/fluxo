/**
 * @generated SignedSource<<7345f062b61f29ea2bb68066dcbe3ad1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type StatsBarQuery$variables = Record<PropertyKey, never>;
export type StatsBarQuery$data = {
  readonly sessionStats: {
    readonly peers: number;
    readonly portsAvailable: number;
    readonly torrents: number;
  };
};
export type StatsBarQuery = {
  response: StatsBarQuery$data;
  variables: StatsBarQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "SessionStats",
    "kind": "LinkedField",
    "name": "sessionStats",
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
    "name": "StatsBarQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "StatsBarQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "778b7e5e1829e7c8be3c9b7356c0c930",
    "id": null,
    "metadata": {},
    "name": "StatsBarQuery",
    "operationKind": "query",
    "text": "query StatsBarQuery {\n  sessionStats {\n    torrents\n    peers\n    portsAvailable\n  }\n}\n"
  }
};
})();

(node as any).hash = "25f0e22c762e0fe8425d2f7f76594209";

export default node;
