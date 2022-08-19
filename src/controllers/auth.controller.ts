import { Request, Response } from 'express';
import { getGithubToken, getGithubUser } from '../utils/helpers/oauth/github';
import { getRedirectString } from '../services/auth.service';
import { AuthService } from '../types/auth.types';
import { getGoogleTokens, getGoogleUser } from '../utils/helpers/oauth/google';

export function authInit(req: Request, res: Response) {
  const { service } = req.query;
  const redirectUrl = getRedirectString(<AuthService>service);
  return res.redirect(redirectUrl);
}

export async function oAuthGithubCallback(req: Request, res: Response) {
  const { code } = req.query;
  const accessToken = await getGithubToken(<string>code);

  if (accessToken) {
    const githubUser = await getGithubUser(accessToken);

    return res.redirect(
      `/profile?username=${githubUser.name}&avatar=${githubUser.avatar_url}`,
    );
  }

  return res.redirect('/');
}

export async function oAuthGoogleCallback(req: Request, res: Response) {
  const { code } = req.query;
  const tokens = await getGoogleTokens(<string>code);
  if (tokens) {
    const googleUser = await getGoogleUser(
      tokens.access_token,
      tokens.id_token,
    );
    return res.redirect(
      `/profile?username=${googleUser.name}&avatar=${googleUser.picture}`,
    );
  }

  return res.redirect('/');
}
