import { appConfig } from '../config/app.config';

export const oAuthConstants = {
  paths: {
    github: {
      authorize: 'https://github.com/login/oauth/authorize?client_id=',
      accessToken: 'https://github.com/login/oauth/access_token',
      user: 'https://api.github.com/user',
    },
    google: {
      authorize: 'https://accounts.google.com/o/oauth2/v2/auth',
      redirect: `${appConfig.domain}/auth/google`,
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
      token: 'https://oauth2.googleapis.com/token',
      user: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=',
    },
  },
};
