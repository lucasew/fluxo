/**
 * @generated SignedSource<<68c2b73b502db71c17e548e50474b8b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AddTorrentInput = {
  stopAfterDownload?: boolean | null | undefined;
  stopAfterMetadata?: boolean | null | undefined;
  stopped?: boolean | null | undefined;
  torrentData?: string | null | undefined;
  uri?: string | null | undefined;
};
export type AddTorrentMutation$variables = {
  input: AddTorrentInput;
};
export type AddTorrentMutation$data = {
  readonly addTorrent: {
    readonly id: string;
    readonly name: string;
  };
};
export type AddTorrentMutation = {
  response: AddTorrentMutation$data;
  variables: AddTorrentMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Torrent",
    "kind": "LinkedField",
    "name": "addTorrent",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddTorrentMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddTorrentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "457d0182956587ad9b0435d1f407f69b",
    "id": null,
    "metadata": {},
    "name": "AddTorrentMutation",
    "operationKind": "mutation",
    "text": "mutation AddTorrentMutation(\n  $input: AddTorrentInput!\n) {\n  addTorrent(input: $input) {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "078df9fc4c9d7b2333960f60392c124f";

export default node;
