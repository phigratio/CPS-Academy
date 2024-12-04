'use strict';

/**
 * role-based-access service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::role-based-access.role-based-access');
