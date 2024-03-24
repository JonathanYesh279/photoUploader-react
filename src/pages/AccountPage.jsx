import React, { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';
import PhotosPage from './PhotosPage';

function AccountPage() {
  const [redirect, setRedirect] = useState(null)
  const { ready, user, setUser } = useContext(UserContext);
  const { subpage } = useParams();

  async function logout() {
    await axios.post('/logout')
    setUser(null);
    setRedirect('/');

  }

  if (!ready) {
    return 'Loading...'
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }
  
  function linkClasses(type=null) {
    let classes = 'inline-flex gap-1 py-2 px-6';
    if (type === 'profile' && subpage === 'profile') {
      classes += ' bg-primary text-white rounded-full';
    } else if (type === 'photos' && subpage === 'photos') {
      classes += ' bg-primary text-white rounded-full';
    }
    return classes;
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div>
      <nav className='w-full flex justify-center mt-8 gap-6 mb-8'>
        <Link className={linkClasses('profile')} to={'/account/profile'}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
            />
          </svg>
          My Profile
        </Link>
        <Link className={linkClasses('photos')} to={'/account/photos'}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z'
            />
          </svg>
          My Photos
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name}
          <br />
          <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
        </div>
      )}
      {subpage === 'photos' && <PhotosPage />}
    </div>
  );
}

export default AccountPage
