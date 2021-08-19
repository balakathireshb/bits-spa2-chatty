import Axios from 'axios';

const baseURL = `https://bala-spa-chat.azurewebsites.net/user/`;

const userApi = Axios.create({
  baseURL
});

const userService = {
  registerUser: async (firstName, lastName, email, password) => {
    console.log('calling user registration api...');
    const resp = await userApi.post('register/', {
      firstName,
      lastName,
      email,
      password
    });
    console.log(resp.data);
    return resp.data;
  },
  login: async (email, password) => {
    console.log('calling login api');
    const resp = await userApi.post('login/', { email, password });
    console.log(resp.data);
    return resp.data;
  }
};

export default userService;
