import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Long` scalar type represents 52-bit integers */
  Long: any;
};

export type Complain = {
  __typename?: 'Complain';
  category: Scalars['String'];
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  description: Scalars['String'];
  descriptionSnippet: Scalars['String'];
  id: Scalars['Int'];
  imagePublicId: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  user: CreatorUserResponse;
  wardNo: Scalars['Int'];
};

export type ComplainInput = {
  category: Scalars['String'];
  description: Scalars['String'];
  imagePublicId: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  title: Scalars['String'];
  wardNo: Scalars['Int'];
};

export type CompletedComplain = {
  __typename?: 'CompletedComplain';
  category: Scalars['String'];
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  description: Scalars['String'];
  descriptionSnippet: Scalars['String'];
  id: Scalars['Int'];
  imagePublicId: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  user: CreatorUserResponse;
  wardNo: Scalars['Int'];
};

export type CreatorUserResponse = {
  __typename?: 'CreatorUserResponse';
  error?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAdmin: UserResponse;
  createComplain: Complain;
  createCompletedComplain: CompletedComplain;
  deleteComplain: Scalars['Boolean'];
  deleteCompletedComplain: Scalars['Boolean'];
  doesEmailExist: Scalars['Boolean'];
  doesPhoneNumberExist: Scalars['Boolean'];
  doesUsernameExist: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  markCompleted: Scalars['Boolean'];
  register: UserResponse;
  updateComplain?: Maybe<Complain>;
  updateCompletedComplain?: Maybe<CompletedComplain>;
};


export type MutationCreateAdminArgs = {
  input: UserInput;
};


export type MutationCreateComplainArgs = {
  input: ComplainInput;
};


export type MutationCreateCompletedComplainArgs = {
  input: ComplainInput;
};


export type MutationDeleteComplainArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCompletedComplainArgs = {
  id: Scalars['Int'];
};


export type MutationDoesEmailExistArgs = {
  email: Scalars['String'];
};


export type MutationDoesPhoneNumberExistArgs = {
  phonenumber: Scalars['Long'];
};


export type MutationDoesUsernameExistArgs = {
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrNumber: Scalars['String'];
};


export type MutationMarkCompletedArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  input: UserInput;
};


export type MutationUpdateComplainArgs = {
  id: Scalars['Int'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateCompletedComplainArgs = {
  id: Scalars['Int'];
  title?: InputMaybe<Scalars['String']>;
};

export type PaginatedComplains = {
  __typename?: 'PaginatedComplains';
  complains: Array<Complain>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedCompletedComplains = {
  __typename?: 'PaginatedCompletedComplains';
  complains: Array<CompletedComplain>;
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  complain?: Maybe<Complain>;
  complains: PaginatedComplains;
  complainsByCategory: PaginatedComplains;
  complainsByUser: PaginatedComplains;
  complainsByWard: PaginatedComplains;
  complainsCount: Scalars['Int'];
  completedComplain?: Maybe<CompletedComplain>;
  completedComplains: PaginatedCompletedComplains;
  completedComplainsByCategory: PaginatedCompletedComplains;
  completedComplainsByUser: PaginatedCompletedComplains;
  completedComplainsByWard: PaginatedCompletedComplains;
  completedComplainsCount: Scalars['Int'];
  me?: Maybe<User>;
  user?: Maybe<UserResponse>;
};


export type QueryComplainArgs = {
  id: Scalars['Int'];
};


export type QueryComplainsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  wardNo?: InputMaybe<Scalars['Int']>;
};


export type QueryComplainsByCategoryArgs = {
  category: Scalars['String'];
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryComplainsByUserArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  userId: Scalars['Int'];
};


export type QueryComplainsByWardArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  wardNo: Scalars['Int'];
};


export type QueryCompletedComplainArgs = {
  id: Scalars['Int'];
};


export type QueryCompletedComplainsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  wardNo?: InputMaybe<Scalars['Int']>;
};


export type QueryCompletedComplainsByCategoryArgs = {
  category: Scalars['String'];
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryCompletedComplainsByUserArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  userId: Scalars['Int'];
};


export type QueryCompletedComplainsByWardArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  wardNo: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['Int'];
  isAdmin: Scalars['Boolean'];
  lastname: Scalars['String'];
  phonenumber: Scalars['Long'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  wardNo: Scalars['Int'];
};

export type UserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  idToken: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['Long'];
  username: Scalars['String'];
  wardNo: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type CreateComplainMutationVariables = Exact<{
  input: ComplainInput;
}>;


export type CreateComplainMutation = { __typename?: 'Mutation', createComplain: { __typename?: 'Complain', id: number, descriptionSnippet: string, title: string, createdAt: string, latitude: number, longitude: number, wardNo: number, imagePublicId: string, user: { __typename?: 'CreatorUserResponse', user?: { __typename?: 'User', id: number, username: string } | null } } };

export type DeleteComplainMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteComplainMutation = { __typename?: 'Mutation', deleteComplain: boolean };

export type DoesEmailExistMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type DoesEmailExistMutation = { __typename?: 'Mutation', doesEmailExist: boolean };

export type DoesPhoneNumberExistMutationVariables = Exact<{
  phonenumber: Scalars['Long'];
}>;


export type DoesPhoneNumberExistMutation = { __typename?: 'Mutation', doesPhoneNumberExist: boolean };

export type DoesUsernameExistMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type DoesUsernameExistMutation = { __typename?: 'Mutation', doesUsernameExist: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrNumber: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: boolean | null, user?: { __typename?: 'User', id: number, username: string, isAdmin: boolean } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MarkCompletedMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MarkCompletedMutation = { __typename?: 'Mutation', markCompleted: boolean };

export type RegisterMutationVariables = Exact<{
  input: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: boolean | null, user?: { __typename?: 'User', id: number, username: string, isAdmin: boolean } | null } };

export type ComplainsByWardQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
  wardNo: Scalars['Int'];
}>;


export type ComplainsByWardQuery = { __typename?: 'Query', complainsByWard: { __typename?: 'PaginatedComplains', hasMore: boolean, complains: Array<{ __typename?: 'Complain', id: number, descriptionSnippet: string, title: string, createdAt: string, latitude: number, longitude: number, wardNo: number, imagePublicId: string, category: string, user: { __typename?: 'CreatorUserResponse', user?: { __typename?: 'User', id: number, username: string } | null } }> } };

export type ComplainQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ComplainQuery = { __typename?: 'Query', complain?: { __typename?: 'Complain', title: string, description: string, latitude: number, longitude: number, createdAt: string, category: string, wardNo: number, imagePublicId: string, user: { __typename?: 'CreatorUserResponse', user?: { __typename?: 'User', id: number, username: string, firstname: string, lastname: string, phonenumber: any, email: string } | null } } | null };

export type ComplainsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type ComplainsQuery = { __typename?: 'Query', complains: { __typename?: 'PaginatedComplains', hasMore: boolean, complains: Array<{ __typename?: 'Complain', id: number, descriptionSnippet: string, title: string, createdAt: string, latitude: number, longitude: number, wardNo: number, imagePublicId: string, user: { __typename?: 'CreatorUserResponse', user?: { __typename?: 'User', id: number, username: string } | null } }> } };

export type ComplainsByCategoryQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
  category: Scalars['String'];
}>;


export type ComplainsByCategoryQuery = { __typename?: 'Query', complainsByCategory: { __typename?: 'PaginatedComplains', hasMore: boolean, complains: Array<{ __typename?: 'Complain', id: number, descriptionSnippet: string, title: string, createdAt: string, latitude: number, longitude: number, wardNo: number, imagePublicId: string, category: string, user: { __typename?: 'CreatorUserResponse', user?: { __typename?: 'User', id: number, username: string } | null } }> } };

export type ComplainsByUserQueryVariables = Exact<{
  limit: Scalars['Int'];
  userId: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type ComplainsByUserQuery = { __typename?: 'Query', complainsByUser: { __typename?: 'PaginatedComplains', hasMore: boolean, complains: Array<{ __typename?: 'Complain', title: string, description: string, latitude: number, longitude: number, createdAt: string, category: string, wardNo: number, imagePublicId: string, user: { __typename?: 'CreatorUserResponse', user?: { __typename?: 'User', id: number, username: string, firstname: string, lastname: string, phonenumber: any, email: string } | null } }> } };

export type ComplainsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type ComplainsCountQuery = { __typename?: 'Query', complainsCount: number };

export type CompletedComplainQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CompletedComplainQuery = { __typename?: 'Query', completedComplain?: { __typename?: 'CompletedComplain', title: string, description: string, latitude: number, longitude: number, createdAt: string, category: string, wardNo: number, imagePublicId: string, user: { __typename?: 'CreatorUserResponse', user?: { __typename?: 'User', id: number, username: string, firstname: string, lastname: string, phonenumber: any, email: string } | null } } | null };

export type CompletedComplainsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type CompletedComplainsQuery = { __typename?: 'Query', completedComplains: { __typename?: 'PaginatedCompletedComplains', hasMore: boolean, complains: Array<{ __typename?: 'CompletedComplain', id: number, descriptionSnippet: string, title: string, createdAt: string, latitude: number, longitude: number, wardNo: number, imagePublicId: string, user: { __typename?: 'CreatorUserResponse', user?: { __typename?: 'User', id: number, username: string } | null } }> } };

export type CompletedComplainsByUserQueryVariables = Exact<{
  limit: Scalars['Int'];
  userId: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type CompletedComplainsByUserQuery = { __typename?: 'Query', completedComplainsByUser: { __typename?: 'PaginatedCompletedComplains', hasMore: boolean, complains: Array<{ __typename?: 'CompletedComplain', title: string, description: string, latitude: number, longitude: number, createdAt: string, category: string, wardNo: number, imagePublicId: string, user: { __typename?: 'CreatorUserResponse', user?: { __typename?: 'User', id: number, username: string, firstname: string, lastname: string, phonenumber: any, email: string } | null } }> } };

export type CompletedComplainsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type CompletedComplainsCountQuery = { __typename?: 'Query', completedComplainsCount: number };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, isAdmin: boolean } | null };

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'UserResponse', errors?: boolean | null, user?: { __typename?: 'User', id: number, username: string, firstname: string, lastname: string, email: string, phonenumber: any, wardNo: number } | null } | null };


export const CreateComplainDocument = gql`
    mutation CreateComplain($input: ComplainInput!) {
  createComplain(input: $input) {
    id
    descriptionSnippet
    title
    createdAt
    latitude
    longitude
    wardNo
    latitude
    imagePublicId
    user {
      user {
        id
        username
      }
    }
  }
}
    `;
export type CreateComplainMutationFn = Apollo.MutationFunction<CreateComplainMutation, CreateComplainMutationVariables>;

/**
 * __useCreateComplainMutation__
 *
 * To run a mutation, you first call `useCreateComplainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateComplainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createComplainMutation, { data, loading, error }] = useCreateComplainMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateComplainMutation(baseOptions?: Apollo.MutationHookOptions<CreateComplainMutation, CreateComplainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateComplainMutation, CreateComplainMutationVariables>(CreateComplainDocument, options);
      }
export type CreateComplainMutationHookResult = ReturnType<typeof useCreateComplainMutation>;
export type CreateComplainMutationResult = Apollo.MutationResult<CreateComplainMutation>;
export type CreateComplainMutationOptions = Apollo.BaseMutationOptions<CreateComplainMutation, CreateComplainMutationVariables>;
export const DeleteComplainDocument = gql`
    mutation DeleteComplain($id: Int!) {
  deleteComplain(id: $id)
}
    `;
export type DeleteComplainMutationFn = Apollo.MutationFunction<DeleteComplainMutation, DeleteComplainMutationVariables>;

/**
 * __useDeleteComplainMutation__
 *
 * To run a mutation, you first call `useDeleteComplainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteComplainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteComplainMutation, { data, loading, error }] = useDeleteComplainMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteComplainMutation(baseOptions?: Apollo.MutationHookOptions<DeleteComplainMutation, DeleteComplainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteComplainMutation, DeleteComplainMutationVariables>(DeleteComplainDocument, options);
      }
export type DeleteComplainMutationHookResult = ReturnType<typeof useDeleteComplainMutation>;
export type DeleteComplainMutationResult = Apollo.MutationResult<DeleteComplainMutation>;
export type DeleteComplainMutationOptions = Apollo.BaseMutationOptions<DeleteComplainMutation, DeleteComplainMutationVariables>;
export const DoesEmailExistDocument = gql`
    mutation DoesEmailExist($email: String!) {
  doesEmailExist(email: $email)
}
    `;
export type DoesEmailExistMutationFn = Apollo.MutationFunction<DoesEmailExistMutation, DoesEmailExistMutationVariables>;

/**
 * __useDoesEmailExistMutation__
 *
 * To run a mutation, you first call `useDoesEmailExistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDoesEmailExistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [doesEmailExistMutation, { data, loading, error }] = useDoesEmailExistMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useDoesEmailExistMutation(baseOptions?: Apollo.MutationHookOptions<DoesEmailExistMutation, DoesEmailExistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DoesEmailExistMutation, DoesEmailExistMutationVariables>(DoesEmailExistDocument, options);
      }
export type DoesEmailExistMutationHookResult = ReturnType<typeof useDoesEmailExistMutation>;
export type DoesEmailExistMutationResult = Apollo.MutationResult<DoesEmailExistMutation>;
export type DoesEmailExistMutationOptions = Apollo.BaseMutationOptions<DoesEmailExistMutation, DoesEmailExistMutationVariables>;
export const DoesPhoneNumberExistDocument = gql`
    mutation DoesPhoneNumberExist($phonenumber: Long!) {
  doesPhoneNumberExist(phonenumber: $phonenumber)
}
    `;
export type DoesPhoneNumberExistMutationFn = Apollo.MutationFunction<DoesPhoneNumberExistMutation, DoesPhoneNumberExistMutationVariables>;

/**
 * __useDoesPhoneNumberExistMutation__
 *
 * To run a mutation, you first call `useDoesPhoneNumberExistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDoesPhoneNumberExistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [doesPhoneNumberExistMutation, { data, loading, error }] = useDoesPhoneNumberExistMutation({
 *   variables: {
 *      phonenumber: // value for 'phonenumber'
 *   },
 * });
 */
export function useDoesPhoneNumberExistMutation(baseOptions?: Apollo.MutationHookOptions<DoesPhoneNumberExistMutation, DoesPhoneNumberExistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DoesPhoneNumberExistMutation, DoesPhoneNumberExistMutationVariables>(DoesPhoneNumberExistDocument, options);
      }
export type DoesPhoneNumberExistMutationHookResult = ReturnType<typeof useDoesPhoneNumberExistMutation>;
export type DoesPhoneNumberExistMutationResult = Apollo.MutationResult<DoesPhoneNumberExistMutation>;
export type DoesPhoneNumberExistMutationOptions = Apollo.BaseMutationOptions<DoesPhoneNumberExistMutation, DoesPhoneNumberExistMutationVariables>;
export const DoesUsernameExistDocument = gql`
    mutation DoesUsernameExist($username: String!) {
  doesUsernameExist(username: $username)
}
    `;
export type DoesUsernameExistMutationFn = Apollo.MutationFunction<DoesUsernameExistMutation, DoesUsernameExistMutationVariables>;

/**
 * __useDoesUsernameExistMutation__
 *
 * To run a mutation, you first call `useDoesUsernameExistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDoesUsernameExistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [doesUsernameExistMutation, { data, loading, error }] = useDoesUsernameExistMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useDoesUsernameExistMutation(baseOptions?: Apollo.MutationHookOptions<DoesUsernameExistMutation, DoesUsernameExistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DoesUsernameExistMutation, DoesUsernameExistMutationVariables>(DoesUsernameExistDocument, options);
      }
export type DoesUsernameExistMutationHookResult = ReturnType<typeof useDoesUsernameExistMutation>;
export type DoesUsernameExistMutationResult = Apollo.MutationResult<DoesUsernameExistMutation>;
export type DoesUsernameExistMutationOptions = Apollo.BaseMutationOptions<DoesUsernameExistMutation, DoesUsernameExistMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrNumber: String!, $password: String!) {
  login(usernameOrNumber: $usernameOrNumber, password: $password) {
    errors
    user {
      id
      username
      isAdmin
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrNumber: // value for 'usernameOrNumber'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MarkCompletedDocument = gql`
    mutation MarkCompleted($id: Int!) {
  markCompleted(id: $id)
}
    `;
export type MarkCompletedMutationFn = Apollo.MutationFunction<MarkCompletedMutation, MarkCompletedMutationVariables>;

/**
 * __useMarkCompletedMutation__
 *
 * To run a mutation, you first call `useMarkCompletedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkCompletedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markCompletedMutation, { data, loading, error }] = useMarkCompletedMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkCompletedMutation(baseOptions?: Apollo.MutationHookOptions<MarkCompletedMutation, MarkCompletedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkCompletedMutation, MarkCompletedMutationVariables>(MarkCompletedDocument, options);
      }
export type MarkCompletedMutationHookResult = ReturnType<typeof useMarkCompletedMutation>;
export type MarkCompletedMutationResult = Apollo.MutationResult<MarkCompletedMutation>;
export type MarkCompletedMutationOptions = Apollo.BaseMutationOptions<MarkCompletedMutation, MarkCompletedMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: UserInput!) {
  register(input: $input) {
    errors
    user {
      id
      username
      isAdmin
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ComplainsByWardDocument = gql`
    query ComplainsByWard($limit: Int!, $cursor: String, $wardNo: Int!) {
  complainsByWard(limit: $limit, cursor: $cursor, wardNo: $wardNo) {
    complains {
      id
      descriptionSnippet
      title
      createdAt
      latitude
      longitude
      wardNo
      latitude
      imagePublicId
      category
      user {
        user {
          id
          username
        }
      }
    }
    hasMore
  }
}
    `;

/**
 * __useComplainsByWardQuery__
 *
 * To run a query within a React component, call `useComplainsByWardQuery` and pass it any options that fit your needs.
 * When your component renders, `useComplainsByWardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComplainsByWardQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      wardNo: // value for 'wardNo'
 *   },
 * });
 */
export function useComplainsByWardQuery(baseOptions: Apollo.QueryHookOptions<ComplainsByWardQuery, ComplainsByWardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ComplainsByWardQuery, ComplainsByWardQueryVariables>(ComplainsByWardDocument, options);
      }
export function useComplainsByWardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComplainsByWardQuery, ComplainsByWardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ComplainsByWardQuery, ComplainsByWardQueryVariables>(ComplainsByWardDocument, options);
        }
export type ComplainsByWardQueryHookResult = ReturnType<typeof useComplainsByWardQuery>;
export type ComplainsByWardLazyQueryHookResult = ReturnType<typeof useComplainsByWardLazyQuery>;
export type ComplainsByWardQueryResult = Apollo.QueryResult<ComplainsByWardQuery, ComplainsByWardQueryVariables>;
export const ComplainDocument = gql`
    query Complain($id: Int!) {
  complain(id: $id) {
    title
    description
    latitude
    longitude
    createdAt
    category
    wardNo
    imagePublicId
    user {
      user {
        id
        username
        firstname
        lastname
        phonenumber
        email
      }
    }
  }
}
    `;

/**
 * __useComplainQuery__
 *
 * To run a query within a React component, call `useComplainQuery` and pass it any options that fit your needs.
 * When your component renders, `useComplainQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComplainQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useComplainQuery(baseOptions: Apollo.QueryHookOptions<ComplainQuery, ComplainQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ComplainQuery, ComplainQueryVariables>(ComplainDocument, options);
      }
export function useComplainLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComplainQuery, ComplainQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ComplainQuery, ComplainQueryVariables>(ComplainDocument, options);
        }
export type ComplainQueryHookResult = ReturnType<typeof useComplainQuery>;
export type ComplainLazyQueryHookResult = ReturnType<typeof useComplainLazyQuery>;
export type ComplainQueryResult = Apollo.QueryResult<ComplainQuery, ComplainQueryVariables>;
export const ComplainsDocument = gql`
    query Complains($limit: Int!, $cursor: String) {
  complains(limit: $limit, cursor: $cursor) {
    complains {
      id
      descriptionSnippet
      title
      createdAt
      latitude
      longitude
      wardNo
      latitude
      imagePublicId
      user {
        user {
          id
          username
        }
      }
    }
    hasMore
  }
}
    `;

/**
 * __useComplainsQuery__
 *
 * To run a query within a React component, call `useComplainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useComplainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComplainsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useComplainsQuery(baseOptions: Apollo.QueryHookOptions<ComplainsQuery, ComplainsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ComplainsQuery, ComplainsQueryVariables>(ComplainsDocument, options);
      }
export function useComplainsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComplainsQuery, ComplainsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ComplainsQuery, ComplainsQueryVariables>(ComplainsDocument, options);
        }
export type ComplainsQueryHookResult = ReturnType<typeof useComplainsQuery>;
export type ComplainsLazyQueryHookResult = ReturnType<typeof useComplainsLazyQuery>;
export type ComplainsQueryResult = Apollo.QueryResult<ComplainsQuery, ComplainsQueryVariables>;
export const ComplainsByCategoryDocument = gql`
    query ComplainsByCategory($limit: Int!, $cursor: String, $category: String!) {
  complainsByCategory(limit: $limit, cursor: $cursor, category: $category) {
    complains {
      id
      descriptionSnippet
      title
      createdAt
      latitude
      longitude
      wardNo
      latitude
      imagePublicId
      category
      user {
        user {
          id
          username
        }
      }
    }
    hasMore
  }
}
    `;

/**
 * __useComplainsByCategoryQuery__
 *
 * To run a query within a React component, call `useComplainsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useComplainsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComplainsByCategoryQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useComplainsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<ComplainsByCategoryQuery, ComplainsByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ComplainsByCategoryQuery, ComplainsByCategoryQueryVariables>(ComplainsByCategoryDocument, options);
      }
export function useComplainsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComplainsByCategoryQuery, ComplainsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ComplainsByCategoryQuery, ComplainsByCategoryQueryVariables>(ComplainsByCategoryDocument, options);
        }
export type ComplainsByCategoryQueryHookResult = ReturnType<typeof useComplainsByCategoryQuery>;
export type ComplainsByCategoryLazyQueryHookResult = ReturnType<typeof useComplainsByCategoryLazyQuery>;
export type ComplainsByCategoryQueryResult = Apollo.QueryResult<ComplainsByCategoryQuery, ComplainsByCategoryQueryVariables>;
export const ComplainsByUserDocument = gql`
    query ComplainsByUser($limit: Int!, $userId: Int!, $cursor: String) {
  complainsByUser(limit: $limit, userId: $userId, cursor: $cursor) {
    complains {
      title
      description
      latitude
      longitude
      createdAt
      category
      wardNo
      imagePublicId
      user {
        user {
          id
          username
          firstname
          lastname
          phonenumber
          email
        }
      }
    }
    hasMore
  }
}
    `;

/**
 * __useComplainsByUserQuery__
 *
 * To run a query within a React component, call `useComplainsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useComplainsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComplainsByUserQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      userId: // value for 'userId'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useComplainsByUserQuery(baseOptions: Apollo.QueryHookOptions<ComplainsByUserQuery, ComplainsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ComplainsByUserQuery, ComplainsByUserQueryVariables>(ComplainsByUserDocument, options);
      }
export function useComplainsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComplainsByUserQuery, ComplainsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ComplainsByUserQuery, ComplainsByUserQueryVariables>(ComplainsByUserDocument, options);
        }
export type ComplainsByUserQueryHookResult = ReturnType<typeof useComplainsByUserQuery>;
export type ComplainsByUserLazyQueryHookResult = ReturnType<typeof useComplainsByUserLazyQuery>;
export type ComplainsByUserQueryResult = Apollo.QueryResult<ComplainsByUserQuery, ComplainsByUserQueryVariables>;
export const ComplainsCountDocument = gql`
    query ComplainsCount {
  complainsCount
}
    `;

/**
 * __useComplainsCountQuery__
 *
 * To run a query within a React component, call `useComplainsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useComplainsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComplainsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useComplainsCountQuery(baseOptions?: Apollo.QueryHookOptions<ComplainsCountQuery, ComplainsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ComplainsCountQuery, ComplainsCountQueryVariables>(ComplainsCountDocument, options);
      }
export function useComplainsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComplainsCountQuery, ComplainsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ComplainsCountQuery, ComplainsCountQueryVariables>(ComplainsCountDocument, options);
        }
export type ComplainsCountQueryHookResult = ReturnType<typeof useComplainsCountQuery>;
export type ComplainsCountLazyQueryHookResult = ReturnType<typeof useComplainsCountLazyQuery>;
export type ComplainsCountQueryResult = Apollo.QueryResult<ComplainsCountQuery, ComplainsCountQueryVariables>;
export const CompletedComplainDocument = gql`
    query CompletedComplain($id: Int!) {
  completedComplain(id: $id) {
    title
    description
    latitude
    longitude
    createdAt
    category
    wardNo
    imagePublicId
    user {
      user {
        id
        username
        firstname
        lastname
        phonenumber
        email
      }
    }
  }
}
    `;

/**
 * __useCompletedComplainQuery__
 *
 * To run a query within a React component, call `useCompletedComplainQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompletedComplainQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompletedComplainQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCompletedComplainQuery(baseOptions: Apollo.QueryHookOptions<CompletedComplainQuery, CompletedComplainQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompletedComplainQuery, CompletedComplainQueryVariables>(CompletedComplainDocument, options);
      }
export function useCompletedComplainLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompletedComplainQuery, CompletedComplainQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompletedComplainQuery, CompletedComplainQueryVariables>(CompletedComplainDocument, options);
        }
export type CompletedComplainQueryHookResult = ReturnType<typeof useCompletedComplainQuery>;
export type CompletedComplainLazyQueryHookResult = ReturnType<typeof useCompletedComplainLazyQuery>;
export type CompletedComplainQueryResult = Apollo.QueryResult<CompletedComplainQuery, CompletedComplainQueryVariables>;
export const CompletedComplainsDocument = gql`
    query CompletedComplains($limit: Int!, $cursor: String) {
  completedComplains(limit: $limit, cursor: $cursor) {
    complains {
      id
      descriptionSnippet
      title
      createdAt
      latitude
      longitude
      wardNo
      latitude
      imagePublicId
      createdAt
      user {
        user {
          id
          username
        }
      }
    }
    hasMore
  }
}
    `;

/**
 * __useCompletedComplainsQuery__
 *
 * To run a query within a React component, call `useCompletedComplainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompletedComplainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompletedComplainsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useCompletedComplainsQuery(baseOptions: Apollo.QueryHookOptions<CompletedComplainsQuery, CompletedComplainsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompletedComplainsQuery, CompletedComplainsQueryVariables>(CompletedComplainsDocument, options);
      }
export function useCompletedComplainsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompletedComplainsQuery, CompletedComplainsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompletedComplainsQuery, CompletedComplainsQueryVariables>(CompletedComplainsDocument, options);
        }
export type CompletedComplainsQueryHookResult = ReturnType<typeof useCompletedComplainsQuery>;
export type CompletedComplainsLazyQueryHookResult = ReturnType<typeof useCompletedComplainsLazyQuery>;
export type CompletedComplainsQueryResult = Apollo.QueryResult<CompletedComplainsQuery, CompletedComplainsQueryVariables>;
export const CompletedComplainsByUserDocument = gql`
    query CompletedComplainsByUser($limit: Int!, $userId: Int!, $cursor: String) {
  completedComplainsByUser(limit: $limit, userId: $userId, cursor: $cursor) {
    complains {
      title
      description
      latitude
      longitude
      createdAt
      category
      wardNo
      imagePublicId
      user {
        user {
          id
          username
          firstname
          lastname
          phonenumber
          email
        }
      }
    }
    hasMore
  }
}
    `;

/**
 * __useCompletedComplainsByUserQuery__
 *
 * To run a query within a React component, call `useCompletedComplainsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompletedComplainsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompletedComplainsByUserQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      userId: // value for 'userId'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useCompletedComplainsByUserQuery(baseOptions: Apollo.QueryHookOptions<CompletedComplainsByUserQuery, CompletedComplainsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompletedComplainsByUserQuery, CompletedComplainsByUserQueryVariables>(CompletedComplainsByUserDocument, options);
      }
export function useCompletedComplainsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompletedComplainsByUserQuery, CompletedComplainsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompletedComplainsByUserQuery, CompletedComplainsByUserQueryVariables>(CompletedComplainsByUserDocument, options);
        }
export type CompletedComplainsByUserQueryHookResult = ReturnType<typeof useCompletedComplainsByUserQuery>;
export type CompletedComplainsByUserLazyQueryHookResult = ReturnType<typeof useCompletedComplainsByUserLazyQuery>;
export type CompletedComplainsByUserQueryResult = Apollo.QueryResult<CompletedComplainsByUserQuery, CompletedComplainsByUserQueryVariables>;
export const CompletedComplainsCountDocument = gql`
    query CompletedComplainsCount {
  completedComplainsCount
}
    `;

/**
 * __useCompletedComplainsCountQuery__
 *
 * To run a query within a React component, call `useCompletedComplainsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompletedComplainsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompletedComplainsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useCompletedComplainsCountQuery(baseOptions?: Apollo.QueryHookOptions<CompletedComplainsCountQuery, CompletedComplainsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompletedComplainsCountQuery, CompletedComplainsCountQueryVariables>(CompletedComplainsCountDocument, options);
      }
export function useCompletedComplainsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompletedComplainsCountQuery, CompletedComplainsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompletedComplainsCountQuery, CompletedComplainsCountQueryVariables>(CompletedComplainsCountDocument, options);
        }
export type CompletedComplainsCountQueryHookResult = ReturnType<typeof useCompletedComplainsCountQuery>;
export type CompletedComplainsCountLazyQueryHookResult = ReturnType<typeof useCompletedComplainsCountLazyQuery>;
export type CompletedComplainsCountQueryResult = Apollo.QueryResult<CompletedComplainsCountQuery, CompletedComplainsCountQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    isAdmin
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserDocument = gql`
    query User($id: Int!) {
  user(id: $id) {
    errors
    user {
      id
      username
      firstname
      lastname
      email
      phonenumber
      wardNo
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;