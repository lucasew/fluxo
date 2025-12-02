/**
 * @generated SignedSource<<2b880176b0fa3e3d962bf92e23d655c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TorrentDetailStopMutation$variables = {
  id: string;
};
export type TorrentDetailStopMutation$data = {
  readonly stopTorrent: boolean;
};
export type TorrentDetailStopMutation = {
  response: TorrentDetailStopMutation$data;
  variables: TorrentDetailStopMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "kind": "ScalarField",
    "name": "stopTorrent",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TorrentDetailStopMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TorrentDetailStopMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4b43cd2532f4600d01971231bcf1337b",
    "id": null,
    "metadata": {},
    "name": "TorrentDetailStopMutation",
    "operationKind": "mutation",
    "text": "mutation TorrentDetailStopMutation(\n  $id: ID!\n) {\n  stopTorrent(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "2f6a9d600189a2a5268c25c9304e693a";

export default node;
