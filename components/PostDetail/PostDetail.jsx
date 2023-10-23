import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import { format } from '@lukeed/ms';
import clsx from 'clsx';
import Link from 'next/link';
import { useMemo } from 'react';
import styles from './PostDetail.module.css';

const PostDetail = ({ post, className }) => {
  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(post.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return 'Just now';
    return `${format(diff, true)} ago`;
  }, [post.createdAt]);
  return (
    <div className={clsx(styles.root, className)}>
      <Link href={`/profile/${post.profile.profileId}`}>
        <a>
          <Container className={styles.creator}>
            <Avatar
              size={36}
              // url={post.user.avatar}
              username={post.profile.username}
            />
            <Container column className={styles.meta}>
              <p className={styles.name}>{post.profile.userName}</p>
              <p className={styles.username}>{post.profile.username}</p>
            </Container>
          </Container>
        </a>
      </Link>
      <div className={styles.wrap}>
        <p className={styles.content}>{post.content}</p>
      </div>
      <div className={styles.wrap}>
        <time dateTime={String(post.createdAt)} className={styles.timestamp}>
          {timestampTxt}
        </time>
      </div>
    </div>
  );
};

export default PostDetail;
