/**
 * @generated SignedSource<<5dc14618e549efa83dc24ba195c1f308>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TorrentListUpdatedSubscription$variables = Record<PropertyKey, never>;
export type TorrentListUpdatedSubscription$data = {
  readonly torrentUpdated: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"TorrentCard_torrent">;
  };
};
export type TorrentListUpdatedSubscription = {
  response: TorrentListUpdatedSubscription$data;
  variables: TorrentListUpdatedSubscription$variables;
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
    "name": "TorrentListUpdatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Torrent",
        "kind": "LinkedField",
        "name": "torrentUpdated",
        "plural": false,
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
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TorrentListUpdatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Torrent",
        "kind": "LinkedField",
        "name": "torrentUpdated",
        "plural": false,
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
    "cacheID": "ab42c1d3faad6d95f379a4c55ea0be18",
    "id": null,
    "metadata": {},
    "name": "TorrentListUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription TorrentListUpdatedSubscription {\n  torrentUpdated {\n    id\n    ...TorrentCard_torrent\n  }\n}\n\nfragment TorrentCard_torrent on Torrent {\n  id\n  name\n  status\n  bytesCompleted\n  bytesTotal\n  downloadSpeed\n  uploadSpeed\n  peers {\n    total\n  }\n}\n"
  }
};
})();

(node as any).hash = "0877444c04be1734477db4a2912835d7";

export default node;
