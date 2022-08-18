import { Request, Response } from 'express';
import { oAuthConstants } from '../constants/oauth.constants';
import { oAuthConfig } from '../config/oauth.config';
import { getGithubToken, getGithubUser } from '../utils/helpers/oauth/github';

export function authInit(req: Request, res: Response) {
  return res.redirect(
    `${oAuthConstants.paths.github.authorize}${oAuthConfig.github.clientId}`,
  );
}

export async function oAuthCallback(req: Request, res: Response) {
  const { code } = req.query;
  const accessToken = await getGithubToken(<string>code);

  if (accessToken) {
    const githubUser = await getGithubUser(accessToken);

    return res.redirect(`/?id=${githubUser.id}&username=${githubUser.name}`);
  }

  return res.redirect('/');
}
