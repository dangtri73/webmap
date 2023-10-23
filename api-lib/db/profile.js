import { ObjectId } from 'mongodb';

export async function findProfileById(db, id) {
  const profiles = await db
    .collection('sf_profiles')
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $limit: 1 },
      {
        $project: {
          _id: 1,
          userName: 1,
          avatar: 1,
          images: 1,
          ring: 1,
          totals: 1,
        },
      },
    ])
    .toArray();
  console.log(profiles);
  if (!profiles[0]) return null;
  console.log(profiles);
  return profiles[0];
}
