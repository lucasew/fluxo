/**
 * @generated SignedSource<<e798d915d3499f1365303c095fcfcffe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type TorrentStatus = "ALLOCATING" | "DOWNLOADING" | "DOWNLOADING_METADATA" | "SEEDING" | "STOPPED" | "STOPPING" | "VERIFYING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type TorrentCard_torrent$data = {
  readonly bytesCompleted: string;
  readonly bytesTotal: string;
  readonly downloadSpeed: number;
  readonly id: string;
  readonly name: string;
  readonly peers: {
    readonly total: number;
  };
  readonly status: TorrentStatus;
  readonly uploadSpeed: number;
  readonly " $fragmentType": "TorrentCard_torrent";
};
export type TorrentCard_torrent$key = {
  readonly " $data"?: TorrentCard_torrent$data;
  readonly " $fragmentSpreads": FragmentRefs<"TorrentCard_torrent">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TorrentCard_torrent",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bytesCompleted",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bytesTotal",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "downloadSpeed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "uploadSpeed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PeerStats",
      "kind": "LinkedField",
      "name": "peers",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "total",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Torrent",
  "abstractKey": null
};

(node as any).hash = "16165766d876ee9c521ccf4ebd52c287";

export default node;
