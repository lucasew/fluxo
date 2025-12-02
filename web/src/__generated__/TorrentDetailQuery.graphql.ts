/**
 * @generated SignedSource<<e40c0b68235ed59f61db1f1ff59f8526>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TorrentStatus = "ALLOCATING" | "DOWNLOADING" | "DOWNLOADING_METADATA" | "SEEDING" | "STOPPED" | "STOPPING" | "VERIFYING" | "%future added value";
export type TrackerStatus = "ANNOUNCING" | "ERROR" | "IDLE" | "WAITING" | "%future added value";
export type TorrentDetailQuery$variables = {
  id: string;
};
export type TorrentDetailQuery$data = {
  readonly torrent: {
    readonly addedAt: string;
    readonly bytesCompleted: string;
    readonly bytesTotal: string;
    readonly downloadSpeed: number;
    readonly eta: number | null | undefined;
    readonly files: ReadonlyArray<{
      readonly bytesCompleted: string;
      readonly length: string;
      readonly path: string;
    }>;
    readonly id: string;
    readonly infoHash: string;
    readonly name: string;
    readonly peers: {
      readonly incoming: number;
      readonly outgoing: number;
      readonly total: number;
    };
    readonly status: TorrentStatus;
    readonly trackers: ReadonlyArray<{
      readonly status: TrackerStatus;
      readonly url: string;
    }>;
    readonly uploadSpeed: number;
  } | null | undefined;
};
export type TorrentDetailQuery = {
  response: TorrentDetailQuery$data;
  variables: TorrentDetailQuery$variables;
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
  "name": "status",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bytesCompleted",
  "storageKey": null
},
v3 = [
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
    "name": "torrent",
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
      (v1/*: any*/),
      (v2/*: any*/),
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
        "kind": "ScalarField",
        "name": "infoHash",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "addedAt",
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "length",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
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
        "concreteType": "Tracker",
        "kind": "LinkedField",
        "name": "trackers",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "url",
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
    "name": "TorrentDetailQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TorrentDetailQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "04d885acbc7ee9835e19405e8d825666",
    "id": null,
    "metadata": {},
    "name": "TorrentDetailQuery",
    "operationKind": "query",
    "text": "query TorrentDetailQuery(\n  $id: ID!\n) {\n  torrent(id: $id) {\n    id\n    name\n    status\n    bytesCompleted\n    bytesTotal\n    downloadSpeed\n    uploadSpeed\n    eta\n    infoHash\n    addedAt\n    files {\n      path\n      length\n      bytesCompleted\n    }\n    peers {\n      total\n      incoming\n      outgoing\n    }\n    trackers {\n      url\n      status\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ea1c59e10ce0d2b251c9680e5b5d1cda";

export default node;
