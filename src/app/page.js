import styles from '@/app/page.module.css';
import UsersContainer from '@/components/UsersContainer/UsersContainer';
import { Suspense } from 'react';
import Loading from '@/app/loading';

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <h2>All users list</h2>
        <Suspense fallback={<Loading />}>
          <UsersContainer />
        </Suspense>
      </div>
    </main>
  );
}
