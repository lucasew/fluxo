/**
 * @generated SignedSource<<9fa11283675d20fe63d44fca461f0ca7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type HeaderStatsQuery$variables = Record<PropertyKey, never>;
export type HeaderStatsQuery$data = {
  readonly torrents: ReadonlyArray<{
    readonly downloadSpeed: number;
    readonly uploadSpeed: number;
  }>;
};
export type HeaderStatsQuery = {
  response: HeaderStatsQuery$data;
  variables: HeaderStatsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "downloadSpeed",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "uploadSpeed",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HeaderStatsQuery",
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
          (v1/*: any*/)
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
    "name": "HeaderStatsQuery",
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e8236f13d4e158fef0b2bfb97b6d0fa1",
    "id": null,
    "metadata": {},
    "name": "HeaderStatsQuery",
    "operationKind": "query",
    "text": "query HeaderStatsQuery {\n  torrents {\n    downloadSpeed\n    uploadSpeed\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "93a9f4670cc0728ce1efde682f2a905d";

export default node;
