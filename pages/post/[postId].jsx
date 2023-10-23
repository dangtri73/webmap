import { findPostDetail } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import { PostDetail } from '@/page-components/PostDetail';
import Head from 'next/head';

export default function PostPage({ post }) {
  // if (typeof post.createdAt !== 'string') {
  //   post.createdAt = new Date(post.createdAt);
  // }
  return (
    <>
      <Head>
        <title>
          {post.profile.userName} : {post.content}
        </title>
      </Head>
      <PostDetail post={post} />
    </>
  );
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();

  const post = await findPostDetail(db, context.params.postId);
  if (!post) {
    return {
      notFound: true,
    };
  }

  // if (context.params.username !== post.creator.username) {
  //   // mismatch params in url, redirect to correct one
  //   // eg. post x belongs to user a, but url is /user/b/post/x
  //   return {
  //     redirect: {
  //       destination: `/user/${post.creator.username}/post/${post._id}`,
  //       permanent: false,
  //     },
  //   };
  // }
  post._id = String(post._id);
  post.profile.profileId = String(post.profile.profileId);
  // post.creatorId = String(post.creatorId);
  // post.creator._id = String(post.creator._id);
  post.createdAt = post.createdAt.toJSON();
  return { props: { post } };
}
