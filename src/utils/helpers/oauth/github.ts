import axios from 'axios';
import { oAuthConstants } from '../../../constants/oauth.constants';
import { HttpMethods } from '../../../enums/httpMethods.enum';
import { oAuthConfig } from '../../../config/oauth.config';
import { GithubUser } from '../../../types/github';

export async function getGithubToken(code: string): Promise<string | null> {
  const request = await axios({
    url: oAuthConstants.paths.github.accessToken,
    method: HttpMethods.POST,
    data: {
      client_id: oAuthConfig.github.clientId,
      client_secret: oAuthConfig.github.clientSecret,
      code,
    },
    headers: { accept: 'application/json' },
  });

  if (request.statusText !== 'OK') return null;
  return request.data.access_token;
}

export async function getGithubUser(token: string): Promise<GithubUser> {
  const { data } = await axios({
    url: oAuthConstants.paths.github.user,
    method: HttpMethods.GET,
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `token ${token}`,
    },
  });

  return data;
}
