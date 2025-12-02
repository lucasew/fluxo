/**
 * @generated SignedSource<<6697e9b85838a62770851550fd6a37b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TorrentListRemovedSubscription$variables = Record<PropertyKey, never>;
export type TorrentListRemovedSubscription$data = {
  readonly torrentRemoved: string;
};
export type TorrentListRemovedSubscription = {
  response: TorrentListRemovedSubscription$data;
  variables: TorrentListRemovedSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "torrentRemoved",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TorrentListRemovedSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TorrentListRemovedSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "aceaa0b5ea7af33e9b5464504707237b",
    "id": null,
    "metadata": {},
    "name": "TorrentListRemovedSubscription",
    "operationKind": "subscription",
    "text": "subscription TorrentListRemovedSubscription {\n  torrentRemoved\n}\n"
  }
};
})();

(node as any).hash = "29c843a8a245e5157086eac0dc4f3cb3";

export default node;
