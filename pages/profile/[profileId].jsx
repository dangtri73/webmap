import { findProfileById } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
// import { PostDetail } from '@/page-components/PostDetail';
import { Profile } from '@/page-components/Profile';

import Head from 'next/head';

export default function ProfilePage({ profile }) {
  // if (typeof post.createdAt !== 'string') {
  //   post.createdAt = new Date(post.createdAt);
  // }
  return (
    <>
      <Head>
        <title>
          {profile.userName} : {profile.description}
        </title>
      </Head>
      <Profile profile={profile} />
    </>
  );
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();

  const profile = await findProfileById(db, context.params.profileId);
  if (!profile) {
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
  profile._id = String(profile._id);
  // profile.createdAt = profile.createdAt.toJSON();
  return { props: { profile } };
}
