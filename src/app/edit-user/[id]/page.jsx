import styles from '@/app/edit-user/[id]/page.module.css';
import EditUserForm from '@/components/EditUserForm/EditUserForm';

const page = ({ params }) => {
  const { id } = params;

  return (
    <main>
      <div className={styles.container}>
        <h2 className={styles.page_title}>Edit User</h2>
        <EditUserForm id={id} />
      </div>
    </main>
  );
};

export default page;
