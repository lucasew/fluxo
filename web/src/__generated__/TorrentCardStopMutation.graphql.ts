/**
 * @generated SignedSource<<1f78b45279a0eff6bc246d3f7bf8dd3a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TorrentCardStopMutation$variables = {
  id: string;
};
export type TorrentCardStopMutation$data = {
  readonly stopTorrent: boolean;
};
export type TorrentCardStopMutation = {
  response: TorrentCardStopMutation$data;
  variables: TorrentCardStopMutation$variables;
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
    "name": "TorrentCardStopMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TorrentCardStopMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "715e63b93458cd26f5508603eae28c71",
    "id": null,
    "metadata": {},
    "name": "TorrentCardStopMutation",
    "operationKind": "mutation",
    "text": "mutation TorrentCardStopMutation(\n  $id: ID!\n) {\n  stopTorrent(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "ff9539307ce18417d6703b0c6988e5f8";

export default node;
