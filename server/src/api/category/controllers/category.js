'use strict';

/**
 * category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::category.category');
module.exports = createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async find(ctx) {
      const populateList = [
        "Header.header_image",
        "Header.buttons",
        "Clients.clients",
      ];
      // Push any additional query params to the array
      populateList.push(ctx.query.populate);
      ctx.query.populate = populateList.join(",");

      const content = await super.find(ctx);
      return content;
    },
  })
);
