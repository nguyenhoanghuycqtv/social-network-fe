import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Huy Nguyen',
      image:
        'https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-1/273834866_968163894098675_4860830010360964328_n.jpg?stp=dst-jpg_p240x240&_nc_cat=106&ccb=1-7&_nc_sid=7206a8&_nc_ohc=DokWbEvt-GkAX-zyh3U&_nc_ht=scontent.fvca1-1.fna&oh=00_AfBWQ-HFyB7IFjYq50WVx2rC4AZ1DdikbBt7fOZ3Qzviyg&oe=640BEA72',
      posts: 3
    },
    {
      id: 'u2',
      name: 'Phuoc Duong',
      image:
        'https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-1/317684060_2286939714815022_5827812932311121504_n.jpg?stp=cp6_dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=ql5sHDFLle4AX8JKPwM&_nc_ht=scontent.fvca1-1.fna&oh=00_AfBEZKn--PwENIvNH52F87mMyzL_OPRqQChUBoqeLWIX3Q&oe=640A0306',
      posts: 5
    },
    
  ];

  return <UsersList items={USERS} />;
};

export default Users;
