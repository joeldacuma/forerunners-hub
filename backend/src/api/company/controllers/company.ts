/**
 * company controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::company.company',
  ({ strapi }) => ({
    async find(ctx) {
      const { data, meta } = await super.find(ctx)

      const sanitizedData = data.map((item) => {
        if (item) {
          const { documentId, ...rest } = item
          return { ...rest }
        } else {
          return item
        }
      })

      return { data: sanitizedData, meta }
    },
  })
)
