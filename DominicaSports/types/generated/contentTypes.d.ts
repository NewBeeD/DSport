import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAllLeagueAllLeague extends Schema.CollectionType {
  collectionName: 'all_leagues';
  info: {
    singularName: 'all-league';
    pluralName: 'all-leagues';
    displayName: 'All_League';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::all-league.all-league',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::all-league.all-league',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArticleArticle extends Schema.CollectionType {
  collectionName: 'articles';
  info: {
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'Article';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Article_Img: Attribute.Media;
    Author: Attribute.String & Attribute.Required;
    Body_Content: Attribute.Text & Attribute.Required;
    all_league: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'api::all-league.all-league'
    >;
    dfa_player: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'api::dfa-player.dfa-player'
    >;
    dfa_team: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'api::dfa-team.dfa-team'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDabaLeagueDabaLeague extends Schema.CollectionType {
  collectionName: 'daba_leagues';
  info: {
    singularName: 'daba-league';
    pluralName: 'daba-leagues';
    displayName: 'DABA_League';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    daba_teams: Attribute.Relation<
      'api::daba-league.daba-league',
      'oneToMany',
      'api::daba-team.daba-team'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::daba-league.daba-league',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::daba-league.daba-league',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDabaPlayerDabaPlayer extends Schema.CollectionType {
  collectionName: 'daba_players';
  info: {
    singularName: 'daba-player';
    pluralName: 'daba-players';
    displayName: 'DABA_Player';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    Profile_Pic: Attribute.Media;
    Birth_Date: Attribute.Date & Attribute.Required;
    Height: Attribute.Decimal;
    Weight: Attribute.Decimal;
    Points: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    Field_Goal_Percentage: Attribute.Decimal;
    Three_Point_Percentage: Attribute.Decimal;
    Free_Throw_Percentage: Attribute.Decimal;
    Rebounds: Attribute.Integer;
    Assists: Attribute.Integer;
    Steals: Attribute.Integer;
    Blocks: Attribute.Integer;
    Turnovers: Attribute.Integer;
    Personal_Fouls: Attribute.Integer;
    daba_team: Attribute.Relation<
      'api::daba-player.daba-player',
      'oneToOne',
      'api::daba-team.daba-team'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::daba-player.daba-player',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::daba-player.daba-player',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDabaTeamDabaTeam extends Schema.CollectionType {
  collectionName: 'daba_teams';
  info: {
    singularName: 'daba-team';
    pluralName: 'daba-teams';
    displayName: 'DABA_Team';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    Foundation_Year: Attribute.Date;
    Community: Attribute.String & Attribute.Required;
    Current_Coach: Attribute.String & Attribute.Required;
    Assistant_Coach: Attribute.String;
    daba_players: Attribute.Relation<
      'api::daba-team.daba-team',
      'oneToMany',
      'api::daba-player.daba-player'
    >;
    daba_league: Attribute.Relation<
      'api::daba-team.daba-team',
      'oneToOne',
      'api::daba-league.daba-league'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::daba-team.daba-team',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::daba-team.daba-team',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDavaLeagueDavaLeague extends Schema.CollectionType {
  collectionName: 'dava_leagues';
  info: {
    singularName: 'dava-league';
    pluralName: 'dava-leagues';
    displayName: 'DAVA_League';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    dava_teams: Attribute.Relation<
      'api::dava-league.dava-league',
      'oneToMany',
      'api::dava-team.dava-team'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dava-league.dava-league',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dava-league.dava-league',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDavaPlayerDavaPlayer extends Schema.CollectionType {
  collectionName: 'dava_players';
  info: {
    singularName: 'dava-player';
    pluralName: 'dava-players';
    displayName: 'DAVA_Player';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    Birth_Date: Attribute.Date & Attribute.Required;
    Height: Attribute.Decimal;
    Weight: Attribute.Decimal;
    Points: Attribute.Integer;
    Kills: Attribute.Integer;
    Attack_Percentage: Attribute.Decimal;
    Assists: Attribute.Integer;
    Service_Aces: Attribute.Integer;
    Service_Errors: Attribute.Integer;
    Reception_Errors: Attribute.Integer;
    Digs: Attribute.Integer;
    Blocks: Attribute.Integer;
    Blocks_Solo: Attribute.Integer;
    Block_Assists: Attribute.Integer;
    Hitting_Efficiency: Attribute.Decimal;
    Serve_Receive: Attribute.Integer;
    Position: Attribute.Enumeration<
      [
        'SETTER',
        'OUTSIDE HITTER',
        'MIDDLE BLOCKER',
        'OPPOSITE HITTER',
        'LIBERO',
        'DEFENSIVE SPECIALIST',
        'SERVING SPECIALIST'
      ]
    >;
    dava_team: Attribute.Relation<
      'api::dava-player.dava-player',
      'oneToOne',
      'api::dava-team.dava-team'
    >;
    Profile_Pic: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dava-player.dava-player',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dava-player.dava-player',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDavaTeamDavaTeam extends Schema.CollectionType {
  collectionName: 'dava_teams';
  info: {
    singularName: 'dava-team';
    pluralName: 'dava-teams';
    displayName: 'DAVA_Team';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    Foundation_Year: Attribute.Date;
    Current_Coach: Attribute.String & Attribute.Required;
    Community: Attribute.String & Attribute.Required;
    dava_players: Attribute.Relation<
      'api::dava-team.dava-team',
      'oneToMany',
      'api::dava-player.dava-player'
    >;
    dava_league: Attribute.Relation<
      'api::dava-team.dava-team',
      'oneToOne',
      'api::dava-league.dava-league'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dava-team.dava-team',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dava-team.dava-team',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDfaLeagueDfaLeague extends Schema.CollectionType {
  collectionName: 'dfa_leagues';
  info: {
    singularName: 'dfa-league';
    pluralName: 'dfa-leagues';
    displayName: 'DFA_League';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dfa-league.dfa-league',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dfa-league.dfa-league',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDfaPlayerDfaPlayer extends Schema.CollectionType {
  collectionName: 'dfa_players';
  info: {
    singularName: 'dfa-player';
    pluralName: 'dfa-players';
    displayName: 'DFA_Player';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    First_Name: Attribute.String & Attribute.Required;
    Last_Name: Attribute.String & Attribute.Required;
    Age: Attribute.Integer & Attribute.Required;
    Birth_Date: Attribute.Date & Attribute.Required;
    Profile_Pic: Attribute.Media;
    Goals: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    Assists: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    Position: Attribute.Enumeration<
      ['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'LW', 'RW', 'ST', 'CF']
    > &
      Attribute.Required;
    Yellow_Cards: Attribute.Integer &
      Attribute.Required &
      Attribute.DefaultTo<0>;
    Red_Cards: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    Gender: Attribute.Enumeration<['Male', 'Female']> & Attribute.Required;
    dfa_team: Attribute.Relation<
      'api::dfa-player.dfa-player',
      'oneToOne',
      'api::dfa-team.dfa-team'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dfa-player.dfa-player',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dfa-player.dfa-player',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDfaPremierLeagueMenTableDfaPremierLeagueMenTable
  extends Schema.CollectionType {
  collectionName: 'dfa_premier_league_men_tables';
  info: {
    singularName: 'dfa-premier-league-men-table';
    pluralName: 'dfa-premier-league-men-tables';
    displayName: 'DFA_Premier_League_Men_Table';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    dfa_team: Attribute.Relation<
      'api::dfa-premier-league-men-table.dfa-premier-league-men-table',
      'oneToOne',
      'api::dfa-team.dfa-team'
    >;
    Played: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    Won: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    Drawn: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    Lost: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    GF: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    GA: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dfa-premier-league-men-table.dfa-premier-league-men-table',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dfa-premier-league-men-table.dfa-premier-league-men-table',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDfaTeamDfaTeam extends Schema.CollectionType {
  collectionName: 'dfa_teams';
  info: {
    singularName: 'dfa-team';
    pluralName: 'dfa-teams';
    displayName: 'DFA_Team';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    Head_Coach: Attribute.String & Attribute.Required;
    Assistant_Coach: Attribute.String;
    Community: Attribute.String & Attribute.Required;
    Gender: Attribute.Enumeration<['Male', 'Female']>;
    Image: Attribute.Media;
    dfa_players: Attribute.Relation<
      'api::dfa-team.dfa-team',
      'oneToMany',
      'api::dfa-player.dfa-player'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dfa-team.dfa-team',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dfa-team.dfa-team',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDnaLeagueDnaLeague extends Schema.CollectionType {
  collectionName: 'dna_leagues';
  info: {
    singularName: 'dna-league';
    pluralName: 'dna-leagues';
    displayName: 'DNA_League';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dna-league.dna-league',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dna-league.dna-league',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDnaPlayerDnaPlayer extends Schema.CollectionType {
  collectionName: 'dna_players';
  info: {
    singularName: 'dna-player';
    pluralName: 'dna-players';
    displayName: 'DNA_Player';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    Profile_Pic: Attribute.Media;
    Birth_Date: Attribute.Date;
    Height: Attribute.Decimal;
    Weight: Attribute.Decimal;
    Position: Attribute.Enumeration<['GS', 'GA', 'WA', 'C', 'WD', 'GD', 'GK']> &
      Attribute.Required;
    Goals_Scored: Attribute.Integer;
    Shooting_Accuracy: Attribute.Decimal;
    Goal_Assits: Attribute.Integer;
    Center_Pass_Receives: Attribute.Integer;
    Interceptions: Attribute.Integer;
    Deflections: Attribute.Integer;
    Rebounds: Attribute.Integer;
    Turnovers: Attribute.Integer;
    Penalties: Attribute.Integer;
    Feeds_Into_Circle: Attribute.Integer;
    Assists: Attribute.Integer;
    Gains: Attribute.Integer;
    Center_Pass_Percentage: Attribute.Decimal;
    Defensive_Three_Second_Violations: Attribute.Integer;
    Goalkeeper_Defense_Rebounds: Attribute.Integer;
    dna_team: Attribute.Relation<
      'api::dna-player.dna-player',
      'oneToOne',
      'api::dna-team.dna-team'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dna-player.dna-player',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dna-player.dna-player',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDnaTeamDnaTeam extends Schema.CollectionType {
  collectionName: 'dna_teams';
  info: {
    singularName: 'dna-team';
    pluralName: 'dna-teams';
    displayName: 'DNA_Team';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    Foundation_Year: Attribute.Date;
    Current_Coach: Attribute.String & Attribute.Required;
    Community: Attribute.String & Attribute.Required;
    dna_players: Attribute.Relation<
      'api::dna-team.dna-team',
      'oneToMany',
      'api::dna-player.dna-player'
    >;
    dna_league: Attribute.Relation<
      'api::dna-team.dna-team',
      'oneToOne',
      'api::dna-league.dna-league'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dna-team.dna-team',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dna-team.dna-team',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFixtureFixture extends Schema.CollectionType {
  collectionName: 'fixtures';
  info: {
    singularName: 'fixture';
    pluralName: 'fixtures';
    displayName: 'Fixture';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Home_Team: Attribute.String & Attribute.Required;
    Away_Team: Attribute.String & Attribute.Required;
    Date: Attribute.DateTime & Attribute.Required;
    Cancelled: Attribute.Enumeration<['Yes', 'No']> &
      Attribute.Required &
      Attribute.DefaultTo<'No'>;
    Home_Team_Score: Attribute.Integer &
      Attribute.Required &
      Attribute.DefaultTo<0>;
    Away_Team_Score: Attribute.Integer &
      Attribute.Required &
      Attribute.DefaultTo<0>;
    venue: Attribute.Relation<
      'api::fixture.fixture',
      'oneToOne',
      'api::venue.venue'
    >;
    all_league: Attribute.Relation<
      'api::fixture.fixture',
      'oneToOne',
      'api::all-league.all-league'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::fixture.fixture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::fixture.fixture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVenueVenue extends Schema.CollectionType {
  collectionName: 'venues';
  info: {
    singularName: 'venue';
    pluralName: 'venues';
    displayName: 'Venue';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    Location: Attribute.Enumeration<
      ['Portsmouth', 'Dublanc', 'Stockfarm', 'Roseau']
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::venue.venue',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::venue.venue',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::all-league.all-league': ApiAllLeagueAllLeague;
      'api::article.article': ApiArticleArticle;
      'api::daba-league.daba-league': ApiDabaLeagueDabaLeague;
      'api::daba-player.daba-player': ApiDabaPlayerDabaPlayer;
      'api::daba-team.daba-team': ApiDabaTeamDabaTeam;
      'api::dava-league.dava-league': ApiDavaLeagueDavaLeague;
      'api::dava-player.dava-player': ApiDavaPlayerDavaPlayer;
      'api::dava-team.dava-team': ApiDavaTeamDavaTeam;
      'api::dfa-league.dfa-league': ApiDfaLeagueDfaLeague;
      'api::dfa-player.dfa-player': ApiDfaPlayerDfaPlayer;
      'api::dfa-premier-league-men-table.dfa-premier-league-men-table': ApiDfaPremierLeagueMenTableDfaPremierLeagueMenTable;
      'api::dfa-team.dfa-team': ApiDfaTeamDfaTeam;
      'api::dna-league.dna-league': ApiDnaLeagueDnaLeague;
      'api::dna-player.dna-player': ApiDnaPlayerDnaPlayer;
      'api::dna-team.dna-team': ApiDnaTeamDnaTeam;
      'api::fixture.fixture': ApiFixtureFixture;
      'api::venue.venue': ApiVenueVenue;
    }
  }
}
