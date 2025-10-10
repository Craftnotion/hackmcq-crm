'use strict';

/**
 * blog router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const router = createCoreRouter('api::blog.blog');

// Add custom routes manually
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/blogs',
      handler: 'blog.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/blogs/:id',
      handler: 'blog.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/blogs/slugs/all',
      handler: 'blog.getSlugs',
      config: {
        auth: false,
      },
    },
  ],
};
