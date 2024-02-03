import Link from 'next/link';
import styles from '@/components/Header/Header.module.css';

const Header = () => {
  return (
    <nav className={styles.header}>
      <div className={styles.container}>
        <div>
          <Link className={styles.logo} href="/">
            User Management
          </Link>
        </div>
        <div>
          <ul className={styles.navlinks}>
            <li className={styles.navlink}>
              <Link href="/create-user">Create User</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
