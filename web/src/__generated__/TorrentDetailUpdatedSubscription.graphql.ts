/**
 * @generated SignedSource<<5dc15ae15317c89d4d6b719c1e1056f0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TorrentStatus = "ALLOCATING" | "DOWNLOADING" | "DOWNLOADING_METADATA" | "SEEDING" | "STOPPED" | "STOPPING" | "VERIFYING" | "%future added value";
export type TorrentDetailUpdatedSubscription$variables = {
  id?: string | null | undefined;
};
export type TorrentDetailUpdatedSubscription$data = {
  readonly torrentUpdated: {
    readonly bytesCompleted: string;
    readonly bytesTotal: string;
    readonly downloadSpeed: number;
    readonly eta: number | null | undefined;
    readonly files: ReadonlyArray<{
      readonly bytesCompleted: string;
      readonly path: string;
    }>;
    readonly id: string;
    readonly peers: {
      readonly incoming: number;
      readonly outgoing: number;
      readonly total: number;
    };
    readonly status: TorrentStatus;
    readonly uploadSpeed: number;
  };
};
export type TorrentDetailUpdatedSubscription = {
  response: TorrentDetailUpdatedSubscription$data;
  variables: TorrentDetailUpdatedSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bytesCompleted",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
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
        "name": "status",
        "storageKey": null
      },
      (v1/*: any*/),
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "incoming",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "outgoing",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "File",
        "kind": "LinkedField",
        "name": "files",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "path",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TorrentDetailUpdatedSubscription",
    "selections": (v2/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TorrentDetailUpdatedSubscription",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "7d93be48ea4f5cae9a8e274a362cab29",
    "id": null,
    "metadata": {},
    "name": "TorrentDetailUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription TorrentDetailUpdatedSubscription(\n  $id: ID\n) {\n  torrentUpdated(id: $id) {\n    id\n    status\n    bytesCompleted\n    bytesTotal\n    downloadSpeed\n    uploadSpeed\n    eta\n    peers {\n      total\n      incoming\n      outgoing\n    }\n    files {\n      path\n      bytesCompleted\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "23d8576cfe1cc29d057f5f172bc1e7ce";

export default node;
