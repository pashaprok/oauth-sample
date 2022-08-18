import axios from 'axios';
import { Request, Response } from 'express';
import { oAuthConstants } from '../constants/oauth.constants';
import { oAuthConfig } from '../config/oauth.config';
import { HttpMethods } from '../enums/httpMethods.enum';

export function authInit(req: Request, res: Response) {
  return res.redirect(
    `${oAuthConstants.paths.github.authorize}${oAuthConfig.github.clientId}`,
  );
}

export async function oAuthCallback(req: Request, res: Response) {
  const { code } = req.query;
  const requestToken = await axios({
    url: oAuthConstants.paths.github.accessToken,
    method: HttpMethods.POST,
    data: {
      client_id: oAuthConfig.github.clientId,
      client_secret: oAuthConfig.github.clientSecret,
      code,
    },
    headers: { accept: 'application/json' },
  });

  if (requestToken.statusText === 'OK') {
    const githubUser = await axios({
      url: oAuthConstants.paths.github.user,
      method: HttpMethods.GET,
      headers: {
        accept: 'application/vnd.github+json',
        authorization: `token ${requestToken.data.access_token}`,
      },
    });

    return res.redirect(
      `/?id=${githubUser.data.id}&username=${githubUser.data.login}`,
    );
  }

  return res.redirect('/');
}
