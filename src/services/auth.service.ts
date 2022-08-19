import { Request, Response } from 'express';
import { getGoogleAuthURL } from '../utils/helpers/oauth/google';
import { getGithubAuthURL } from '../utils/helpers/oauth/github';
import { ServicesEnum } from '../enums/services.enum';
import { getUser } from '../utils/helpers/user';

export function getRedirectString(service: ServicesEnum) {
  if (service === 'github') return getGithubAuthURL();
  if (service === 'google') return getGoogleAuthURL();
  return '';
}

export const getProfileURL = (username: string, avatar: string) =>
  `/profile?username=${username}&avatar=${avatar}`;

export async function resolveOAuthCallback(
  service: ServicesEnum,
  req: Request,
  res: Response,
) {
  const { code } = req.query;
  const user = await getUser(<string>code, service);
  if (user) {
    return res.redirect(getProfileURL(user.name, user.avatar));
  }

  return res.redirect('/');
}
