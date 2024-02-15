'use strict';

/**
 * player-stat service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::player-stat.player-stat');
