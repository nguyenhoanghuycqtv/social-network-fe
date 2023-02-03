import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Casemiro',
      image:
        'https://znews-photo.zingcdn.me/w660/Uploaded/wobjcak/2023_01_04/case.jpeg',
      posts: 3
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
