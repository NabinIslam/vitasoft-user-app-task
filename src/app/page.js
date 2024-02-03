import styles from '@/app/page.module.css';
import UsersContainer from '@/components/UsersContainer/UsersContainer';

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <h2>All users list</h2>
        <UsersContainer />
      </div>
    </main>
  );
}
