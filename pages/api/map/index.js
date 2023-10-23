import { imageModel, ringModel } from '@/api-lib/common';
import { findPostsMap } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const posts = await findPostsMap(
    db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );
  // console.log('post map string:', JSON.stringify(posts));
  // console.log('post map object:', posts);
  if (posts?.length) {
    posts.map((post) => {
      if (post?.profile?.avatar) {
        post.profile.avatar = imageModel(post.profile.avatar);
      }
      if (post?.profile?.ring) {
        post.profile.ring = ringModel(post.profile.ring);
      }
    });
  }

  res.json({ posts });
});

export default handler;
