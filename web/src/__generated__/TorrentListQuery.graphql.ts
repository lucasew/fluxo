/**
 * @generated SignedSource<<5c7945d384c74f7a0df3d5aa8d55beee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TorrentListQuery$variables = Record<PropertyKey, never>;
export type TorrentListQuery$data = {
  readonly torrents: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"TorrentCard_torrent">;
  }>;
};
export type TorrentListQuery = {
  response: TorrentListQuery$data;
  variables: TorrentListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TorrentListQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Torrent",
        "kind": "LinkedField",
        "name": "torrents",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TorrentCard_torrent"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TorrentListQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Torrent",
        "kind": "LinkedField",
        "name": "torrents",
        "plural": true,
        "selections": [
          (v0/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "7327accc1369e571960fab4fef89d659",
    "id": null,
    "metadata": {},
    "name": "TorrentListQuery",
    "operationKind": "query",
    "text": "query TorrentListQuery {\n  torrents {\n    id\n    ...TorrentCard_torrent\n  }\n}\n\nfragment TorrentCard_torrent on Torrent {\n  id\n  name\n  status\n  bytesCompleted\n  bytesTotal\n  downloadSpeed\n  uploadSpeed\n  peers {\n    total\n  }\n}\n"
  }
};
})();

(node as any).hash = "9179b6fdd6e2f30685374ccf5913bf6e";

export default node;
