'use-strict';

import { factories } from '@strapi/strapi'; 

export default factories.createCoreController('plugin::users-permissions.user', ({ strapi }) =>  ({
  // Method 2: Wrapping a core action (leaves core logic in place)
  async findOne(ctx) {
    console.log(ctx)
  },

}));