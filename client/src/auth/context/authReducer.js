import { types } from '../types/types';

export const authReducer = (state, action) => {
  switch (action.type) {
    case types.login:
      return { 
        ...state, 
        logged: true,
        user: action.payload.user,
        token: action.payload.token,
       };
    case types.logout:
      return { ...state, logged: false, user: null, token: null };
    default:
      return state;
  }
};
