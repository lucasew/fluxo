/**
 * @generated SignedSource<<538c43fddf6ad50546a5fa6a9c90d3d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TorrentStatus =
  | "ALLOCATING"
  | "DOWNLOADING"
  | "DOWNLOADING_METADATA"
  | "SEEDING"
  | "STOPPED"
  | "STOPPING"
  | "VERIFYING"
  | "%future added value";
export type TorrentListUpdatedSubscription$variables = Record<
  PropertyKey,
  never
>;
export type TorrentListUpdatedSubscription$data = {
  readonly torrentUpdated: {
    readonly bytesCompleted: string;
    readonly bytesTotal: string;
    readonly downloadSpeed: number;
    readonly eta: number | null | undefined;
    readonly id: string;
    readonly peers: {
      readonly total: number;
    };
    readonly status: TorrentStatus;
    readonly uploadSpeed: number;
  };
};
export type TorrentListUpdatedSubscription = {
  response: TorrentListUpdatedSubscription$data;
  variables: TorrentListUpdatedSubscription$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
    {
      alias: null,
      args: null,
      concreteType: "Torrent",
      kind: "LinkedField",
      name: "torrentUpdated",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "id",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "status",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "bytesCompleted",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "bytesTotal",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "downloadSpeed",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "uploadSpeed",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "eta",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          concreteType: "PeerStats",
          kind: "LinkedField",
          name: "peers",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "total",
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ];
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "TorrentListUpdatedSubscription",
      selections: v0 /*: any*/,
      type: "Subscription",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "TorrentListUpdatedSubscription",
      selections: v0 /*: any*/,
    },
    params: {
      cacheID: "da8190637bef31753db3ccbc8ad1c0f9",
      id: null,
      metadata: {},
      name: "TorrentListUpdatedSubscription",
      operationKind: "subscription",
      text: "subscription TorrentListUpdatedSubscription {\n  torrentUpdated {\n    id\n    status\n    bytesCompleted\n    bytesTotal\n    downloadSpeed\n    uploadSpeed\n    eta\n    peers {\n      total\n    }\n  }\n}\n",
    },
  };
})();

(node as any).hash = "af8868e8976972e6bd427492bc540cb1";

export default node;
