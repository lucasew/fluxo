/**
 * @generated SignedSource<<b00bdb93893975d3f4df95d8e7bcc92f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TorrentCardStartMutation$variables = {
  id: string;
};
export type TorrentCardStartMutation$data = {
  readonly startTorrent: boolean;
};
export type TorrentCardStartMutation = {
  response: TorrentCardStartMutation$data;
  variables: TorrentCardStartMutation$variables;
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
    "name": "TorrentCardStartMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TorrentCardStartMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e5868c4e7638278fc4930316ea8a37c3",
    "id": null,
    "metadata": {},
    "name": "TorrentCardStartMutation",
    "operationKind": "mutation",
    "text": "mutation TorrentCardStartMutation(\n  $id: ID!\n) {\n  startTorrent(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "078222f874c732f6222f605fd0176f64";

export default node;
