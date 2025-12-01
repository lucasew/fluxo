/**
 * @generated SignedSource<<55cded7263305755dbf39d20669c1c1c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TorrentCardRemoveMutation$variables = {
  id: string;
};
export type TorrentCardRemoveMutation$data = {
  readonly removeTorrent: boolean;
};
export type TorrentCardRemoveMutation = {
  response: TorrentCardRemoveMutation$data;
  variables: TorrentCardRemoveMutation$variables;
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
    "name": "removeTorrent",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TorrentCardRemoveMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TorrentCardRemoveMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "19e1ebbe272c8b0816d558823dda67c9",
    "id": null,
    "metadata": {},
    "name": "TorrentCardRemoveMutation",
    "operationKind": "mutation",
    "text": "mutation TorrentCardRemoveMutation(\n  $id: ID!\n) {\n  removeTorrent(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "bc7277f47a65ffc8d3280cd591322526";

export default node;
