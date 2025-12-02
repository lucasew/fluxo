/**
 * @generated SignedSource<<4aad7a70632a7e80c0c4372ea7a03f2d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TorrentDetailRemoveMutation$variables = {
  id: string;
};
export type TorrentDetailRemoveMutation$data = {
  readonly removeTorrent: boolean;
};
export type TorrentDetailRemoveMutation = {
  response: TorrentDetailRemoveMutation$data;
  variables: TorrentDetailRemoveMutation$variables;
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
    "name": "TorrentDetailRemoveMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TorrentDetailRemoveMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2640b10031fe1344a8d5f769be84e7af",
    "id": null,
    "metadata": {},
    "name": "TorrentDetailRemoveMutation",
    "operationKind": "mutation",
    "text": "mutation TorrentDetailRemoveMutation(\n  $id: ID!\n) {\n  removeTorrent(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "628cc63275c727f6b4d8bb562aef86c7";

export default node;
