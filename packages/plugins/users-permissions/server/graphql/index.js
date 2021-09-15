'use strict';

const getTypes = require('./types');
const getQueries = require('./queries');
const getMutations = require('./mutations');

module.exports = ({ strapi }) => {
  const extensionService = strapi.plugin('graphql').service('extension');

  // Disable Permissions queries & mutations but allow the
  // type to be used/selected in filters or nested resolvers
  extensionService
    .shadowCRUD('plugin::users-permissions.permission')
    .disableQueries()
    .disableMutations();

  // Disable User & Role's Create/Update/Delete actions so they can be replaced
  const actionsToDisable = ['create', 'update', 'delete'];

  extensionService.shadowCRUD('plugin::users-permissions.user').disableActions(actionsToDisable);
  extensionService.shadowCRUD('plugin::users-permissions.role').disableActions(actionsToDisable);

  // Register new types & resolvers config
  extensionService.use(({ nexus, strapi }) => {
    const types = getTypes({ strapi, nexus });
    const queries = getQueries({ strapi, nexus });
    const mutations = getMutations({ strapi, nexus });

    return {
      types: [types, queries, mutations],

      resolversConfig: {
        'Mutation.login': {
          auth: false,
        },

        'Mutation.register': {
          auth: false,
        },

        'Mutation.forgotPassword': {
          auth: false,
        },

        'Mutation.resetPassword': {
          auth: false,
        },

        'Mutation.emailConfirmation': {
          auth: false,
        },
      },
    };
  });
};
