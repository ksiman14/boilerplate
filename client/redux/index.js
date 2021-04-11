const axios = require('axios');

const TOKEN = 'TOKEN';

const SET_AUTH = 'SET_AUTH';

const setAuth = (auth) => ({
  type: SET_AUTH,
  auth,
});

export const me = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.get('/api/auth/me', {
          headers: {
            authorization: token,
          },
        });
        return dispatch(setAuth(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const authenticate = (name, password, method) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/auth/${method}`, {
        name,
        password,
      });
      window.localStorage.setItem(TOKEN, data.token);
      dispatch(me());
    } catch (err) {
      return dispatch(setAuth({ error: err }));
    }
  };
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
};
