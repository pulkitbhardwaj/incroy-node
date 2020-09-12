/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type usersQueryVariables = {};
export type usersQueryResponse = {
    readonly users: ReadonlyArray<{
        readonly id: string;
        readonly firstName: string;
        readonly lastName: string;
        readonly email: string;
        readonly updatedAt: unknown;
        readonly createdAt: unknown;
    }>;
};
export type usersQuery = {
    readonly response: usersQueryResponse;
    readonly variables: usersQueryVariables;
};



/*
query usersQuery {
  users {
    id
    firstName
    lastName
    email
    updatedAt
    createdAt
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "users",
    "plural": true,
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
        "name": "firstName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lastName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "updatedAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "usersQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "usersQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "827d1fed2f4e28b7504b00eefb5021c2",
    "id": null,
    "metadata": {},
    "name": "usersQuery",
    "operationKind": "query",
    "text": "query usersQuery {\n  users {\n    id\n    firstName\n    lastName\n    email\n    updatedAt\n    createdAt\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f9286f72f9a59070dd9e766ed1318006';
export default node;
