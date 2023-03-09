import { withApollo as createWithApollo } from 'next-apollo';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import {
  PaginatedComplains,
  CompletedComplain,
  PaginatedCompletedComplains,
} from '../generated/graphql';
// import { Complain, ComplainsQuery, PaginatedComplains } from '../generated/graphql';
import { updateForm } from '../store/actions/registerForm';

export const client = (ctx) =>
  new ApolloClient({
    // uri: process.env.GRAPHQL_SERVER as string,
    uri: process.env.NEXT_PUBLIC_API_URL,
    // uri: 'http://localhost:5000/graphql',
    credentials: 'include',
    headers: {
      cookie: ctx?.req?.headers?.cookie,
      // (typeof window === 'undefined'
      //   ? ctx?.req?.headers.cookie
      //   : undefined) || '',
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            doesEmailExist: {},
            complains: {
              keyArgs: [], // Enter the variables that are not related to paginatoin eg ['query']
              merge(
                existing: PaginatedComplains | undefined,
                incoming: PaginatedComplains
              ): PaginatedComplains {
                return {
                  __typename: 'PaginatedComplains',
                  hasMore: incoming.hasMore,
                  complains: [
                    ...(existing?.complains || []),
                    ...incoming.complains,
                  ],
                };
              },
            },
            completedComplains: {
              keyArgs: [], // Enter the variables that are not related to paginatoin eg ['query']
              merge(
                existing: PaginatedCompletedComplains | undefined,
                incoming: PaginatedCompletedComplains
              ): PaginatedCompletedComplains {
                return {
                  __typename: 'PaginatedCompletedComplains',
                  hasMore: incoming.hasMore,
                  complains: [
                    ...(existing?.complains || []),
                    ...incoming.complains,
                  ],
                };
              },
            },
            complainsByUser: {
              keyArgs: [], // Enter the variables that are not related to paginatoin eg ['query']
              merge(
                existing: PaginatedCompletedComplains | undefined,
                incoming: PaginatedCompletedComplains
              ): PaginatedCompletedComplains {
                return {
                  __typename: 'PaginatedCompletedComplains',
                  hasMore: incoming.hasMore,
                  complains: [
                    ...(existing?.complains || []),
                    ...incoming.complains,
                  ],
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(client);
