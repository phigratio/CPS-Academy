'use strict';

/**
 * role-based-access router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::role-based-access.role-based-access');
