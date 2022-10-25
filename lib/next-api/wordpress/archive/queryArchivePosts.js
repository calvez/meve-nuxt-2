import {nextApiRoutes} from '@/lib/next-api/connector'
import {gql} from '@apollo/client'

// Query: retrieve archive posts by post type.
const queryArchivePosts = gql`
  query GET_ARCHIVE_POSTS(
    $postType: String!
    $cursor: String!
    $year: Int
    $month: Int
    $day: Int
    $taxonomy: String
    $term: ID
    $orderBy: String = DATE
    $order: String = DESC
  ) {
    archive(
      postType: $postType
      cursor: $cursor
      year: $year
      month: $month
      day: $day
      taxonomy: $taxonomy
      term: $term
      orderBy: $orderBy
      order: $order
    ) @rest(type: "Archive", path: "${nextApiRoutes.wordpress.archive}?{args}") {
      pagination
      posts
    }
  }
`

export default queryArchivePosts
