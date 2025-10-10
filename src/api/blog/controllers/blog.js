'use strict';

/**
 * blog controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::blog.blog', ({ strapi }) => ({

  // Get all blogs with pagination (only published)
  async find(ctx) {
    try {
      const { page = 1, pageSize = 5 } = ctx.query;

      const limit = Number(pageSize);
      const start = (Number(page) - 1) * limit;

      // Count only published blogs
      const total = await strapi.db.query('api::blog.blog').count({
        where: { publishedAt: { $notNull: true } },
      });

      //Fetch only published blogs
      const blogs = await strapi.db.query('api::blog.blog').findMany({
        where: { publishedAt: { $notNull: true } },
        populate: {
          blog_card_image: true,
          author: true,
        },
        orderBy: { createdAt: 'desc' },
        limit,
        offset: start,
      });

      const pageCount = Math.ceil(total / limit);

      return {
        data: blogs,
        meta: {
          pagination: {
            page: Number(page),
            pageSize: limit,
            pageCount,
            total,
          },
        },
      };
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return ctx.internalServerError('Unable to fetch blogs');
    }
  },

  //Get single blog by ID
  async findOne(ctx) {
    try {
      const { id } = ctx.params;

      const blog = await strapi.db.query('api::blog.blog').findOne({
        where: { id: parseInt(id, 10), publishedAt: { $notNull: true } },
        populate: {
          author: true,
          blog_view_image: true,
          blog_card_image: true,
          author_image: true,
        },
      });

      if (!blog) {
        return ctx.notFound('Blog not found');
      }

      return { data: blog };
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      return ctx.internalServerError('Unable to fetch blog');
    }
  },

  // Get all blog slugs (only published)
  async getSlugs(ctx) {
    try {
      const blogs = await strapi.db.query('api::blog.blog').findMany({
        where: { publishedAt: { $notNull: true } },
        select: ['slug'],
      });

      const slugs = blogs.map(blog => blog.slug);

      return { data: slugs };
    } catch (error) {
      console.error('Error fetching blog slugs:', error);
      return ctx.internalServerError('Unable to fetch blog slugs');
    }
  },

}));
