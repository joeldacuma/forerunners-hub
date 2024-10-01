/**
 * newsletter controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::newsletter.newsletter",
  ({ strapi }) => ({
    async getSubscriberByEmail(ctx) {
      const email = ctx.params.email;

      const response = await strapi
        .query("api::newsletter.newsletter")
        .findOne({
          where: { email: email },
        });

      return {
        isAvailable: response?.email && response?.active ? true : false,
      };
    },
  })
);
