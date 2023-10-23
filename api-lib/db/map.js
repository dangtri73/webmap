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
        $lookup: {
          from: 'sf_profiles',
          localField: 'user',
          foreignField: 'user',
          as: 'profile',
        },
      },
      { $unwind: '$profile' },
      {
        $project: {
          _id: 1,
          profile: {
            profileId: '$profile._id',
            avatar: 1,
            ring: 1,
            userName: 1,
          },
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
