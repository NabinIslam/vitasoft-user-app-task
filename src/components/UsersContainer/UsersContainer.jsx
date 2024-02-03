import styles from '@/components/UsersContainer/UsersContainer.module.css';
import UserCard from '../UserCard/UserCard';

async function getUsers() {
  const res = await fetch(`https://tasks.vitasoftsolutions.com/userdata/`, {
    cache: 'no-cache',
  });

  if (!res.ok) throw new Error('Failed to fetch data');

  return res.json();
}

const UsersContainer = async () => {
  const users = await getUsers();

  return (
    <div className={styles.users_container}>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersContainer;
