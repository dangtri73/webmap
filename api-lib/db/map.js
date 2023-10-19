export async function findPostsMap(db) {
  return db
    .collection('sf_posts')
    .aggregate([
      {
        $match: {
          _id: { $exists: true },
        },
      },
      {
        $project: {
          coordinates: '$location.coordinates',
          content: '$content.default',
          createdAt: 1,
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 10 },
    ])
    .toArray();
}
