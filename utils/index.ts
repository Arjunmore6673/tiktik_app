import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const createOrGetUser = async (response: any, addUser: any) => {
  const decoded: {
    name: string;
    email: string;
    picture: string;
    sub: string;
  } = jwtDecode(response.credential);
  console.log(decoded);
  const { name, email, picture, sub } = decoded;
  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };

  /// add user
  addUser(user);

  // make api call
  await axios.post(`http://localhost:3000/api/auth`, user);
};

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
