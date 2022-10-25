import getPostsDateArchive from '@/functions/wordpress/posts/getPostsDateArchive'
import getPostTypeArchive from '@/functions/wordpress/postTypes/getPostTypeArchive'
import getPostTypeTaxonomyArchive from '@/functions/wordpress/postTypes/getPostTypeTaxonomyArchive'

/**
 * Load more posts for an archive.
 *
 * @author WebDevStudios
 * @param {object} req Instance of http.IncomingMessage.
 * @param {object} res Instance of http.ServerResponse.
 */
export default async function archive(req, res) {
  try {
    // Retrieve props from request query params.
    const {
      postType,
      day = null,
      month = null,
      year = null,
      taxonomy = '',
      term = '',
      orderBy = 'DATE',
      order = 'DESC',
      cursor = null
    } = req.query

    let postsData = {}

    // Retrieve post data based on optional params.
    if (taxonomy && term) {
      // Taxonomy archive.
      postsData = await getPostTypeTaxonomyArchive(
        taxonomy,
        term,
        postType,
        orderBy,
        order,
        cursor
      )
    } else if (postType === 'post' && !isNaN(year)) {
      // Date archive.
      postsData = await getPostsDateArchive(
        postType,
        !isNaN(parseInt(year, 10)) ? parseInt(year, 10) : null,
        !isNaN(parseInt(month, 10)) ? parseInt(month, 10) : null,
        !isNaN(parseInt(day, 10)) ? parseInt(day, 10) : null,
        orderBy,
        order,
        cursor
      )
    } else {
      // Standard archive.
      postsData = await getPostTypeArchive(postType, orderBy, order, cursor)
    }

    // Check for errors.
    if (postsData.error) {
      throw new Error(postsData.errorMessage)
    }

    // Remove Apollo client from return.
    delete postsData?.apolloClient

    res.status(200).send(postsData)
  } catch (error) {
    res
      .status(error?.status || 500)
      .end(
        error?.message ||
          'An error occurred while attempting to load more posts'
      )
  }
}
