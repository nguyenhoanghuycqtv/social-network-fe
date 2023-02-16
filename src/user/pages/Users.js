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
    },
    {
      id: 'u2',
      name: 'Ibrahimovic',
      image:
        'https://vtv1.mediacdn.vn/zoom/550_339/2020/12/31/ibra-16093727779431744658462.jpg',
      posts: 5
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
