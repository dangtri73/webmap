import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Post } from '@/components/Post';
import { Text } from '@/components/Text';
import { usePostPages } from '@/lib/post';
import Link from 'next/link';
import styles from './UserPosts.module.css';

const ProfilePosts = ({ profile }) => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = usePostPages({
    creatorId: profile.user,
  });
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  return (
    <div className={styles.root}>
      <Spacer axis="vertical" size={1} />
      <Wrapper>
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post._id}`}>
            <a className={styles.wrap}>
              <Post className={styles.post} post={post} />
            </a>
          </Link>
        ))}
        <Container justifyContent="center">
          {isReachingEnd ? (
            <Text color="secondary">No more posts are found</Text>
          ) : (
            <Button
              variant="ghost"
              type="success"
              loading={isLoadingMore}
              onClick={() => setSize(size + 1)}
            >
              Load more
            </Button>
          )}
        </Container>
      </Wrapper>
    </div>
  );
};

export default ProfilePosts;
