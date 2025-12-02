/**
 * @generated SignedSource<<dfa0c855fce8c9c34901d80982d49811>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type HeaderStatsSubscription$variables = Record<PropertyKey, never>;
export type HeaderStatsSubscription$data = {
  readonly torrentUpdated: {
    readonly downloadSpeed: number;
    readonly id: string;
    readonly uploadSpeed: number;
  };
};
export type HeaderStatsSubscription = {
  response: HeaderStatsSubscription$data;
  variables: HeaderStatsSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Torrent",
    "kind": "LinkedField",
    "name": "torrentUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "downloadSpeed",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "uploadSpeed",
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
    "name": "HeaderStatsSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HeaderStatsSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "82a556005937c00b74c940d916396dd8",
    "id": null,
    "metadata": {},
    "name": "HeaderStatsSubscription",
    "operationKind": "subscription",
    "text": "subscription HeaderStatsSubscription {\n  torrentUpdated {\n    id\n    downloadSpeed\n    uploadSpeed\n  }\n}\n"
  }
};
})();

(node as any).hash = "31827780c12452ac197119bea7fe10a7";

export default node;
