import { Spacer, Wrapper } from '@/components/Layout';
import { PostDetail as PostItemDetail } from '@/components/PostDetail';
// import { Post as PostItem } from '@/components/Post';
// import Commenter from './Commenter';
// import CommentList from './CommentList';
import styles from './PostDetail.module.css';

export const PostDetail = ({ post }) => {
  return (
    <Wrapper>
      <Spacer size={2} axis="vertical" />
      <PostItemDetail post={post} />
      <h3 className={styles.subtitle}>Posts {post._id}</h3>
      <h3 className={styles.subtitle}>{JSON.stringify(post)}</h3>
      {/* <Commenter post={post} />
      <CommentList post={post} /> */}
    </Wrapper>
  );
};
