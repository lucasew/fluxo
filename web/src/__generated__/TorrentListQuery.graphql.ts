/**
 * @generated SignedSource<<0b941dd1708a2fc14b7230746f175094>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TorrentStatus = "ALLOCATING" | "DOWNLOADING" | "DOWNLOADING_METADATA" | "SEEDING" | "STOPPED" | "STOPPING" | "VERIFYING" | "%future added value";
export type TorrentListQuery$variables = Record<PropertyKey, never>;
export type TorrentListQuery$data = {
  readonly torrents: ReadonlyArray<{
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
  }>;
};
export type TorrentListQuery = {
  response: TorrentListQuery$data;
  variables: TorrentListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Torrent",
    "kind": "LinkedField",
    "name": "torrents",
    "plural": true,
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
    "name": "TorrentListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TorrentListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "31498c05345b6a83b9790a66636ab162",
    "id": null,
    "metadata": {},
    "name": "TorrentListQuery",
    "operationKind": "query",
    "text": "query TorrentListQuery {\n  torrents {\n    id\n    name\n    status\n    bytesCompleted\n    bytesTotal\n    downloadSpeed\n    uploadSpeed\n    eta\n    peers {\n      total\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9a82b7064f4c9e58c26be26be3638d7f";

export default node;
