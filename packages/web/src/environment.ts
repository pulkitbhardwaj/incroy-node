import { Environment, Network, RecordSource, Store } from 'relay-runtime'

const __GRAPHQL_API__ = 'http://localhost:4000/graphql'

/**
 *
 *
 **************************Implement your own data caching*****************************
 *
 * 																(In-memory Cache)
 * const oneMinute = 60 * 1000;
 * const cache = new QueryResponseCache({ size: 250, ttl: oneMinute });
 *
 *
 */

/**
 * Create Data Store
 */
const store = new Store(new RecordSource())

/**
 * Create Network Layer
 */
const network = Network.create((operation, variables, cacheConfig) =>
	fetch(__GRAPHQL_API__, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: operation.text,
			variables,
		}),
	}).then((response) => {
		return response.json()
	}),
)

/**
 * Create Relay Environment
 */
export const environment = new Environment({
	network,
	store,
})
