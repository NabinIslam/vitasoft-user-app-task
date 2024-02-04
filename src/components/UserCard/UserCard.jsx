import styles from '@/components/UserCard/UserCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

const UserCard = ({ user }) => {
  return (
    <div className={styles.card}>
      <Link className={styles.editBtn} href={`/edit-user/${user.id}`}>
        Edit
      </Link>
      <div className={styles.user_dp_name}>
        {user.profile_picture && (
          <Image
            className={styles.user_img}
            src={user.profile_picture}
            height={50}
            width={50}
            alt={user.name}
          />
        )}
        <div>
          <h4>{user.name}</h4>
          <h6>Birth: {user.birthdate}</h6>
        </div>
      </div>
      <div className={styles.user_info}>
        <p className={styles.user_joined}>Joined: {user.joining_date}</p>
        <h6
          style={{
            color: `${user.active_status ? 'green' : 'red'}`,
          }}
        >
          {user.active_status ? 'Active' : 'Inacive'}
        </h6>
      </div>
    </div>
  );
};

export default UserCard;
