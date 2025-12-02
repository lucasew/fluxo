/**
 * @generated SignedSource<<12e07beed9e23c90456f70990310a4d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TorrentStatus = "ALLOCATING" | "DOWNLOADING" | "DOWNLOADING_METADATA" | "SEEDING" | "STOPPED" | "STOPPING" | "VERIFYING" | "%future added value";
export type TorrentListAddedSubscription$variables = Record<PropertyKey, never>;
export type TorrentListAddedSubscription$data = {
  readonly torrentAdded: {
    readonly bytesCompleted: string;
    readonly bytesTotal: string;
    readonly downloadSpeed: number;
    readonly eta: number | null | undefined;
    readonly id: string;
    readonly name: string;
    readonly peers: {
      readonly total: number;
    };
    readonly status: TorrentStatus;
    readonly uploadSpeed: number;
  };
};
export type TorrentListAddedSubscription = {
  response: TorrentListAddedSubscription$data;
  variables: TorrentListAddedSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Torrent",
    "kind": "LinkedField",
    "name": "torrentAdded",
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
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "bytesCompleted",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "bytesTotal",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "eta",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "PeerStats",
        "kind": "LinkedField",
        "name": "peers",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "total",
            "storageKey": null
          }
        ],
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
    "name": "TorrentListAddedSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TorrentListAddedSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "d390aafb74913ea3d5da44d3db47ab4b",
    "id": null,
    "metadata": {},
    "name": "TorrentListAddedSubscription",
    "operationKind": "subscription",
    "text": "subscription TorrentListAddedSubscription {\n  torrentAdded {\n    id\n    name\n    status\n    bytesCompleted\n    bytesTotal\n    downloadSpeed\n    uploadSpeed\n    eta\n    peers {\n      total\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7a8b3f88f54b40ab22dcd5dca8884acc";

export default node;
