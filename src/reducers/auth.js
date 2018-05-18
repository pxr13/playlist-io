import { handleActions } from 'redux-actions';

const initialState = {
  isAuthenticated: false
};

export default handleActions(
  {
    SIGN_IN_USER: (state, action) => ({
      ...state,
      ...action.payload,
      isAuthenticated: true,
      isPremium: Boolean(action.payload.isPremium === 'true')
    }),
    REFRESH_ACCESS_TOKEN: (state, action) => ({
      ...state,
      accessToken: action.payload
    })
  },
  initialState
);

export const getAuth = (state) => state.auth;

export const getSpotifyId = (state) => state.auth.spotifyId;

export const getAccessToken = (state) => state.auth.accessToken;

export const getRefreshToken = (state) => state.auth.refreshToken;

export const getIsAuthenticated = (state) => state.auth.isAuthenticated;

export const getIsPremium = (state) => state.auth.isPremium;
