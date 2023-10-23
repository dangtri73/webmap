export const imageModel = (image) => {
  const img = {
    ...image,
  };
  const type = img?.mimeType ? img.mimeType.split('/')[1] : 'jpeg';
  const fileName = img?.fileName ? img.fileName.split('.')[0] : undefined;
  return process.env.BASE_URL_MEDIA + fileName + '_thumbnail_small.' + type;
};

export const ringModel = (ring) => {
  const result = {
    posts: {
      status: ring?.posts >= 1 ? true : false,
      current: ring?.posts ?? 0,
      target: 1,
    },
    comments: {
      status: ring?.comments >= 5 ? true : false,
      current: ring?.comments ?? 0,
      target: 5,
    },
    followers: {
      status: ring?.followers >= 3 ? true : false,
      current: ring?.followers ?? 0,
      target: 3,
    },
    followings: {
      status: ring?.followings >= 3 ? true : false,
      current: ring?.followings ?? 0,
      target: 3,
    },
    percent: 0,
  };
  const count =
    0 +
    (result.posts.status ? 1 : 0) +
    (result.comments.status ? 1 : 0) +
    (result.followers.status ? 1 : 0) +
    (result.followings.status ? 1 : 0);
  return {
    percent: count
      ? Math.round((count / (Object.keys(result)?.length - 1)) * 100)
      : 5,
  };
};
