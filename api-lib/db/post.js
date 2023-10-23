import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findPostDetail(db, id) {
  const posts = await db
    .collection('sf_posts')
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $limit: 1 },
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
          content: '$content.default',
          profile: {
            profileId: '$profile._id',
            avatar: 1,
            ring: 1,
            userName: 1,
          },
          createdAt: 1,
        },
      },
    ])
    .toArray();
  if (!posts[0]) return null;
  console.log(posts);
  return posts[0];
}

export async function findPostById(db, id) {
  const posts = await db
    .collection('posts')
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'users',
          localField: 'creatorId',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' },
      { $project: dbProjectionUsers('creator.') },
    ])
    .toArray();
  if (!posts[0]) return null;
  console.log(posts);
  return posts[0];
}

export async function findPosts(db, before, by, limit = 10) {
  return db
    .collection('posts')
    .aggregate([
      {
        $match: {
          ...(by && { creatorId: new ObjectId(by) }),
          ...(before && { createdAt: { $lt: before } }),
        },
      },
      { $sort: { _id: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'creatorId',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' },
      { $project: dbProjectionUsers('creator.') },
    ])
    .toArray();
}

export async function insertPost(db, { content, creatorId }) {
  const post = {
    content,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('posts').insertOne(post);
  post._id = insertedId;
  return post;
}
