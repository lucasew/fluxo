/**
 * @generated SignedSource<<c94d72a7b044b4858026dfba8127009f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TorrentListAddedSubscription$variables = Record<PropertyKey, never>;
export type TorrentListAddedSubscription$data = {
  readonly torrentAdded: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"TorrentCard_torrent">;
  };
};
export type TorrentListAddedSubscription = {
  response: TorrentListAddedSubscription$data;
  variables: TorrentListAddedSubscription$variables;
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
    "name": "TorrentListAddedSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Torrent",
        "kind": "LinkedField",
        "name": "torrentAdded",
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
    "name": "TorrentListAddedSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Torrent",
        "kind": "LinkedField",
        "name": "torrentAdded",
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
    "cacheID": "32f6ed4183b0dcad2074727512c25a30",
    "id": null,
    "metadata": {},
    "name": "TorrentListAddedSubscription",
    "operationKind": "subscription",
    "text": "subscription TorrentListAddedSubscription {\n  torrentAdded {\n    id\n    ...TorrentCard_torrent\n  }\n}\n\nfragment TorrentCard_torrent on Torrent {\n  id\n  name\n  status\n  bytesCompleted\n  bytesTotal\n  downloadSpeed\n  uploadSpeed\n  peers {\n    total\n  }\n}\n"
  }
};
})();

(node as any).hash = "83449a98cdbf1b3e7aad1f12f35911af";

export default node;
