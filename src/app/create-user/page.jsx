import styles from '@/app/create-user/page.module.css';
import CreateUserForm from '@/components/CreateUserForm/CreateUserForm';

const page = () => {
  return (
    <main>
      <div className={styles.container}>
        <h1 className={styles.page_title}>Create User</h1>
        <CreateUserForm />
      </div>
    </main>
  );
};

export default page;
