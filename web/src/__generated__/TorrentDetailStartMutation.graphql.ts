/**
 * @generated SignedSource<<6457b23c354c0a239f7cf7f5cad1155e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TorrentDetailStartMutation$variables = {
  id: string;
};
export type TorrentDetailStartMutation$data = {
  readonly startTorrent: boolean;
};
export type TorrentDetailStartMutation = {
  response: TorrentDetailStartMutation$data;
  variables: TorrentDetailStartMutation$variables;
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
    "name": "startTorrent",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TorrentDetailStartMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TorrentDetailStartMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "43e977bb1328339acf4a98bb1d11f4e0",
    "id": null,
    "metadata": {},
    "name": "TorrentDetailStartMutation",
    "operationKind": "mutation",
    "text": "mutation TorrentDetailStartMutation(\n  $id: ID!\n) {\n  startTorrent(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "c13126107471b8683cf7149d53541e4f";

export default node;
