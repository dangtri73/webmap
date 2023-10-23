import styles from './Profile.module.css';
import ProfileHeader from './ProfileHeader';
// import ProfilePosts from './ProfilePosts';

export const Profile = ({ profile }) => {
  return (
    <div className={styles.root}>
      <ProfileHeader profile={profile} />
      {/* <ProfilePosts user={profile} /> */}
    </div>
  );
};
