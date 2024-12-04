'use strict';

/**
 * role-based-access controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::role-based-access.role-based-access');
