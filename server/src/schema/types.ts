import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Appointment = {
  __typename?: "Appointment";
  id: Scalars["ID"];
  user: User;
  client: Client;
  category?: Maybe<Category>;
  created_at: Scalars["String"];
  scheduled_for: Scalars["String"];
  result?: Maybe<Scalars["String"]>;
  previous_appointment?: Maybe<Appointment>;
};

export type AppointmentInput = {
  users_id?: Maybe<Scalars["ID"]>;
  clients_id?: Maybe<Scalars["ID"]>;
  categories_id?: Maybe<Scalars["ID"]>;
  created_at?: Maybe<Scalars["String"]>;
  scheduled_for?: Maybe<Scalars["String"]>;
  result?: Maybe<Scalars["String"]>;
  previous_appointment_id?: Maybe<Scalars["ID"]>;
};

export type AppointmentSearchInput = {
  id?: Maybe<Scalars["ID"]>;
  users_id?: Maybe<Scalars["ID"]>;
  clients_id?: Maybe<Scalars["ID"]>;
  categories_id?: Maybe<Scalars["ID"]>;
  created_at?: Maybe<Scalars["String"]>;
  scheduled_for?: Maybe<Scalars["String"]>;
  result?: Maybe<Scalars["String"]>;
  previous_appointment_id?: Maybe<Scalars["ID"]>;
};

export type AppointmentsMutation = {
  __typename?: "AppointmentsMutation";
  createAppointment: Appointment;
  updateAppointment: Appointment;
  deleteAppointment?: Maybe<Scalars["Boolean"]>;
};

export type AppointmentsMutationCreateAppointmentArgs = {
  input: AppointmentInput;
};

export type AppointmentsMutationUpdateAppointmentArgs = {
  id: Scalars["ID"];
  input?: Maybe<AppointmentInput>;
};

export type AppointmentsMutationDeleteAppointmentArgs = {
  id: Scalars["ID"];
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

export type CategoriesMutation = {
  __typename?: "CategoriesMutation";
  createCategory: Category;
  updateCategory: Category;
  deleteCategory?: Maybe<Scalars["Boolean"]>;
};

export type CategoriesMutationCreateCategoryArgs = {
  input?: Maybe<CategoryInput>;
};

export type CategoriesMutationUpdateCategoryArgs = {
  id: Scalars["ID"];
  input?: Maybe<CategoryInput>;
};

export type CategoriesMutationDeleteCategoryArgs = {
  id: Scalars["ID"];
};

export type Category = {
  __typename?: "Category";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

export type CategoryInput = {
  name?: Maybe<Scalars["String"]>;
};

export type CategorySearchInput = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export type Client = {
  __typename?: "Client";
  id: Scalars["ID"];
  first_name: Scalars["String"];
  last_name: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  phone_number?: Maybe<Scalars["String"]>;
};

export type ClientInput = {
  first_name?: Maybe<Scalars["String"]>;
  last_name?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  phone_number?: Maybe<Scalars["String"]>;
};

export type ClientSearchInput = {
  id?: Maybe<Scalars["ID"]>;
  first_name?: Maybe<Scalars["String"]>;
  last_name?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  phone_number?: Maybe<Scalars["String"]>;
};

export type ClientsMutation = {
  __typename?: "ClientsMutation";
  createClient: Client;
  updateClient: Client;
  deleteClient?: Maybe<Scalars["Boolean"]>;
};

export type ClientsMutationCreateClientArgs = {
  input: ClientInput;
};

export type ClientsMutationUpdateClientArgs = {
  id: Scalars["ID"];
  input: ClientInput;
};

export type ClientsMutationDeleteClientArgs = {
  id: Scalars["ID"];
};

export type Image = {
  __typename?: "Image";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  base64data: Scalars["String"];
};

export type ImageInput = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  base64data: Scalars["String"];
};

export type ImagesMutation = {
  __typename?: "ImagesMutation";
  createImage: Image;
  deleteImage?: Maybe<Scalars["Boolean"]>;
};

export type ImagesMutationCreateImageArgs = {
  input: ImageInput;
};

export type ImagesMutationDeleteImageArgs = {
  id: Scalars["ID"];
};

export type Mutation = {
  __typename?: "Mutation";
  clients: ClientsMutation;
  users: UsersMutation;
  appointments: AppointmentsMutation;
  images: ImagesMutation;
  categories: CategoriesMutation;
};

export type Query = {
  __typename?: "Query";
  clients: Array<Maybe<Client>>;
  users?: Maybe<UsersQuery>;
  appointments: Array<Maybe<Appointment>>;
  images: Array<Maybe<Image>>;
  categories: Array<Maybe<Category>>;
};

export type QueryClientsArgs = {
  input?: Maybe<ClientSearchInput>;
};

export type QueryAppointmentsArgs = {
  input?: Maybe<AppointmentSearchInput>;
};

export type QueryImagesArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type QueryCategoriesArgs = {
  input?: Maybe<CategorySearchInput>;
};

export enum Roles {
  Admin = "ADMIN",
  User = "USER",
}

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  first_name: Scalars["String"];
  last_name: Scalars["String"];
  email: Scalars["String"];
  address?: Maybe<Scalars["String"]>;
  phone_number?: Maybe<Scalars["String"]>;
  role: Roles;
  assigned_categories?: Maybe<Array<Maybe<Category>>>;
};

export type UserInput = {
  first_name?: Maybe<Scalars["String"]>;
  last_name?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  phone_number?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  role?: Maybe<Roles>;
  assigned_categories?: Maybe<Array<Maybe<Scalars["Int"]>>>;
};

export type UserSearchInput = {
  id?: Maybe<Scalars["ID"]>;
  first_name?: Maybe<Scalars["String"]>;
  last_name?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  phone_number?: Maybe<Scalars["String"]>;
  role?: Maybe<Roles>;
  assigned_categories?: Maybe<Array<Maybe<Scalars["Int"]>>>;
};

export type UsersMutation = {
  __typename?: "UsersMutation";
  createUser: User;
  updateUser: User;
  deleteUser: Scalars["Boolean"];
  login: Scalars["Boolean"];
  logout: Scalars["Boolean"];
};

export type UsersMutationCreateUserArgs = {
  input: UserInput;
};

export type UsersMutationUpdateUserArgs = {
  id: Scalars["ID"];
  input: UserInput;
};

export type UsersMutationDeleteUserArgs = {
  id: Scalars["ID"];
};

export type UsersMutationLoginArgs = {
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type UsersQuery = {
  __typename?: "UsersQuery";
  getUsers: Array<Maybe<User>>;
  me: User;
};

export type UsersQueryGetUsersArgs = {
  input?: Maybe<UserSearchInput>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  ClientSearchInput: ClientSearchInput;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Client: ResolverTypeWrapper<Client>;
  UsersQuery: ResolverTypeWrapper<UsersQuery>;
  UserSearchInput: UserSearchInput;
  ROLES: Roles;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  User: ResolverTypeWrapper<User>;
  Category: ResolverTypeWrapper<Category>;
  AppointmentSearchInput: AppointmentSearchInput;
  Appointment: ResolverTypeWrapper<Appointment>;
  Image: ResolverTypeWrapper<Image>;
  CategorySearchInput: CategorySearchInput;
  Mutation: ResolverTypeWrapper<{}>;
  ClientsMutation: ResolverTypeWrapper<ClientsMutation>;
  ClientInput: ClientInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  UsersMutation: ResolverTypeWrapper<UsersMutation>;
  UserInput: UserInput;
  AppointmentsMutation: ResolverTypeWrapper<AppointmentsMutation>;
  AppointmentInput: AppointmentInput;
  ImagesMutation: ResolverTypeWrapper<ImagesMutation>;
  ImageInput: ImageInput;
  CategoriesMutation: ResolverTypeWrapper<CategoriesMutation>;
  CategoryInput: CategoryInput;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars["Upload"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  ClientSearchInput: ClientSearchInput;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Client: Client;
  UsersQuery: UsersQuery;
  UserSearchInput: UserSearchInput;
  Int: Scalars["Int"];
  User: User;
  Category: Category;
  AppointmentSearchInput: AppointmentSearchInput;
  Appointment: Appointment;
  Image: Image;
  CategorySearchInput: CategorySearchInput;
  Mutation: {};
  ClientsMutation: ClientsMutation;
  ClientInput: ClientInput;
  Boolean: Scalars["Boolean"];
  UsersMutation: UsersMutation;
  UserInput: UserInput;
  AppointmentsMutation: AppointmentsMutation;
  AppointmentInput: AppointmentInput;
  ImagesMutation: ImagesMutation;
  ImageInput: ImageInput;
  CategoriesMutation: CategoriesMutation;
  CategoryInput: CategoryInput;
  Upload: Scalars["Upload"];
};

export type AppointmentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Appointment"] = ResolversParentTypes["Appointment"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  client?: Resolver<ResolversTypes["Client"], ParentType, ContextType>;
  category?: Resolver<
    Maybe<ResolversTypes["Category"]>,
    ParentType,
    ContextType
  >;
  created_at?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  scheduled_for?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  previous_appointment?: Resolver<
    Maybe<ResolversTypes["Appointment"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AppointmentsMutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AppointmentsMutation"] = ResolversParentTypes["AppointmentsMutation"]
> = {
  createAppointment?: Resolver<
    ResolversTypes["Appointment"],
    ParentType,
    ContextType,
    RequireFields<AppointmentsMutationCreateAppointmentArgs, "input">
  >;
  updateAppointment?: Resolver<
    ResolversTypes["Appointment"],
    ParentType,
    ContextType,
    RequireFields<AppointmentsMutationUpdateAppointmentArgs, "id">
  >;
  deleteAppointment?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<AppointmentsMutationDeleteAppointmentArgs, "id">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CategoriesMutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CategoriesMutation"] = ResolversParentTypes["CategoriesMutation"]
> = {
  createCategory?: Resolver<
    ResolversTypes["Category"],
    ParentType,
    ContextType,
    RequireFields<CategoriesMutationCreateCategoryArgs, never>
  >;
  updateCategory?: Resolver<
    ResolversTypes["Category"],
    ParentType,
    ContextType,
    RequireFields<CategoriesMutationUpdateCategoryArgs, "id">
  >;
  deleteCategory?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<CategoriesMutationDeleteCategoryArgs, "id">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CategoryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Category"] = ResolversParentTypes["Category"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ClientResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Client"] = ResolversParentTypes["Client"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  phone_number?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ClientsMutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ClientsMutation"] = ResolversParentTypes["ClientsMutation"]
> = {
  createClient?: Resolver<
    ResolversTypes["Client"],
    ParentType,
    ContextType,
    RequireFields<ClientsMutationCreateClientArgs, "input">
  >;
  updateClient?: Resolver<
    ResolversTypes["Client"],
    ParentType,
    ContextType,
    RequireFields<ClientsMutationUpdateClientArgs, "id" | "input">
  >;
  deleteClient?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<ClientsMutationDeleteClientArgs, "id">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ImageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Image"] = ResolversParentTypes["Image"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  base64data?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ImagesMutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ImagesMutation"] = ResolversParentTypes["ImagesMutation"]
> = {
  createImage?: Resolver<
    ResolversTypes["Image"],
    ParentType,
    ContextType,
    RequireFields<ImagesMutationCreateImageArgs, "input">
  >;
  deleteImage?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<ImagesMutationDeleteImageArgs, "id">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  clients?: Resolver<
    ResolversTypes["ClientsMutation"],
    ParentType,
    ContextType
  >;
  users?: Resolver<ResolversTypes["UsersMutation"], ParentType, ContextType>;
  appointments?: Resolver<
    ResolversTypes["AppointmentsMutation"],
    ParentType,
    ContextType
  >;
  images?: Resolver<ResolversTypes["ImagesMutation"], ParentType, ContextType>;
  categories?: Resolver<
    ResolversTypes["CategoriesMutation"],
    ParentType,
    ContextType
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  clients?: Resolver<
    Array<Maybe<ResolversTypes["Client"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryClientsArgs, never>
  >;
  users?: Resolver<
    Maybe<ResolversTypes["UsersQuery"]>,
    ParentType,
    ContextType
  >;
  appointments?: Resolver<
    Array<Maybe<ResolversTypes["Appointment"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryAppointmentsArgs, never>
  >;
  images?: Resolver<
    Array<Maybe<ResolversTypes["Image"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryImagesArgs, never>
  >;
  categories?: Resolver<
    Array<Maybe<ResolversTypes["Category"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryCategoriesArgs, never>
  >;
};

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Upload"], any> {
  name: "Upload";
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  phone_number?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  role?: Resolver<ResolversTypes["ROLES"], ParentType, ContextType>;
  assigned_categories?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Category"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UsersMutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UsersMutation"] = ResolversParentTypes["UsersMutation"]
> = {
  createUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<UsersMutationCreateUserArgs, "input">
  >;
  updateUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<UsersMutationUpdateUserArgs, "id" | "input">
  >;
  deleteUser?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<UsersMutationDeleteUserArgs, "id">
  >;
  login?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<UsersMutationLoginArgs, never>
  >;
  logout?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UsersQueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UsersQuery"] = ResolversParentTypes["UsersQuery"]
> = {
  getUsers?: Resolver<
    Array<Maybe<ResolversTypes["User"]>>,
    ParentType,
    ContextType,
    RequireFields<UsersQueryGetUsersArgs, never>
  >;
  me?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  Appointment?: AppointmentResolvers<ContextType>;
  AppointmentsMutation?: AppointmentsMutationResolvers<ContextType>;
  CategoriesMutation?: CategoriesMutationResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Client?: ClientResolvers<ContextType>;
  ClientsMutation?: ClientsMutationResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  ImagesMutation?: ImagesMutationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UsersMutation?: UsersMutationResolvers<ContextType>;
  UsersQuery?: UsersQueryResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
