import styles from '../styles/components/Layout.module.css';
import { useUserData } from '@nhost/react'
import { useUserId } from '@nhost/react'
import { useSignOut } from '@nhost/react'
import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { gql, useQuery  } from '@apollo/client';
import { Menu, Transition } from '@headlessui/react';
import Avatar from '../components/Avatar';
import {
  ChevronDownIcon,
  HomeIcon,
  LogoutIcon,
  UserIcon,
  LightningBoltIcon
} from '@heroicons/react/outline';


const GET_USER_QUERY = gql`
  query GetUser($id: uuid!) {
    user(id: $id) {
      id
      email
      displayName
      metadata
      avatarUrl
    }
  }
`

const Layout = () => {
  const { signOut } = useSignOut()
  const id = useUserId();

  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { id },
    skip: !id
  })
  const user = useUserData()
  const menuItems = [
    {
      label: 'Dashboard',
      href: '/',
      icon: HomeIcon,
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: UserIcon,
    },
    {
      label: 'Help',
      href: '/help',
      icon: LightningBoltIcon,
    },
    {
      label: 'Logout',
      onClick: signOut,
      icon: LogoutIcon,
    },
  ];
  return (
    <div>
      <header className={styles.header}>
        <div className={styles['header-container']}>
          <Link to="/">
            <img src='https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/Breezeline_logo.png/220px-Breezeline_logo.png' alt="logo" />
          </Link>

          <Menu as="div" className={styles.menu}>
            <Menu.Button className={styles['menu-button']}>
              <Avatar src={user?.avatarUrl} alt={user?.displayName} />
              <ChevronDownIcon />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter={styles['menu-transition-enter']}
              enterFrom={styles['menu-transition-enter-from']}
              enterTo={styles['menu-transition-enter-to']}
              leave={styles['menu-transition-leave']}
              leaveFrom={styles['menu-transition-leave-from']}
              leaveTo={styles['menu-transition-leave-to']}
            >
              <Menu.Items className={styles['menu-items-container']}>
                <div className={styles['menu-header']}>
                  <Avatar src={user?.avatarUrl} alt={user?.displayName} />
                  <div className={styles['user-details']}>
                    <span>{user?.displayName}</span>
                    <span className={styles['user-email']}>{user?.email}</span>
                  </div>
                </div>

                <div className={styles['menu-items']}>
                  {menuItems.map(({ label, href, onClick, icon: Icon }) => (
                    <div key={label} className={styles['menu-item']}>
                      <Menu.Item>
                        {href ? (
                          <Link to={href}>
                            <Icon />
                            <span>{label}</span>
                          </Link>
                        ) : (
                          <button onClick={onClick}>
                            <Icon />
                            <span>{label}</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles['main-container']}>

          <Outlet context={{ user }} />

        </div>
      </main>
    </div>
  );
};

export default Layout;
