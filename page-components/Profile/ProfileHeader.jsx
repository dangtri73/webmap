import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import styles from './ProfileHeader.module.css';

const ProfileHeader = ({ profile }) => {
  return (
    <Container className={styles.root} column alignItems="center">
      <div className={styles.avatar}>
        <Avatar
          size={168}
          username={profile.userName}
          // url={profile.profilePicture}
        />
      </div>
      <h1>
        <div className={styles.name}>{profile.name}</div>
        <div className={styles.username}>@{profile.userName}</div>
      </h1>
      <p className={styles.bio}>{profile.bio}</p>
    </Container>
  );
};

export default ProfileHeader;
