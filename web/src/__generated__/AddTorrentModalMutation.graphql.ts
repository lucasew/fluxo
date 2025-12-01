/**
 * @generated SignedSource<<8c2476579fa8feda2739e59aa893c13d>>
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
  uri: string;
};
export type AddTorrentModalMutation$variables = {
  input: AddTorrentInput;
};
export type AddTorrentModalMutation$data = {
  readonly addTorrent: {
    readonly id: string;
    readonly name: string;
  };
};
export type AddTorrentModalMutation = {
  response: AddTorrentModalMutation$data;
  variables: AddTorrentModalMutation$variables;
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
    "name": "AddTorrentModalMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddTorrentModalMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1cf3cddfcd4fb71429635642794d1389",
    "id": null,
    "metadata": {},
    "name": "AddTorrentModalMutation",
    "operationKind": "mutation",
    "text": "mutation AddTorrentModalMutation(\n  $input: AddTorrentInput!\n) {\n  addTorrent(input: $input) {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "bf68ff9ef1d2de673aad7d3ab2c370bd";

export default node;
