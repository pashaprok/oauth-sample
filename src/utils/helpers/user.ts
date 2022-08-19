import { ServicesEnum } from '../../enums/services.enum';
import { User } from '../../types/user.types';
import { getGithubToken, getGithubUser } from './oauth/github';
import { getGoogleTokens, getGoogleUser } from './oauth/google';
import { GoogleTokens } from '../../types/google.types';
import { GithubToken } from '../../types/github.types';

function getToken(
  code: string,
  service: ServicesEnum,
): Promise<GoogleTokens | GithubToken | null> {
  if (service === ServicesEnum.google) return getGoogleTokens(code);
  if (service === ServicesEnum.github) return getGithubToken(code);
  return null;
}

async function getUserByToken(
  token: GithubToken | GoogleTokens,
  service: ServicesEnum,
): Promise<User> {
  const user: User = {
    name: '',
    avatar: '',
  };

  if (
    service === ServicesEnum.google &&
    token instanceof Object &&
    token.access_token &&
    token.id_token
  ) {
    const { name, picture } = await getGoogleUser(
      token.access_token,
      token.id_token,
    );
    user.name = name;
    user.avatar = picture;
  }

  if (service === ServicesEnum.github && typeof token === 'string') {
    const githubUser = await getGithubUser(token);
    user.name = githubUser.name;
    user.avatar = githubUser.avatar_url;
  }

  return user;
}

export async function getUser(
  code: string,
  service: ServicesEnum,
): Promise<User> {
  const token = await getToken(code, service);
  if (token) return getUserByToken(token, service);
  return null;
}
