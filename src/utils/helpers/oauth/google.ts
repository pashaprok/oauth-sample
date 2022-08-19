import axios from 'axios';
import { oAuthConstants } from '../../../constants/oauth.constants';
import { oAuthConfig } from '../../../config/oauth.config';
import { GoogleTokens, GoogleUser } from '../../../types/google.types';
import { HttpMethods } from '../../../enums/httpMethods.enum';

export function getGoogleAuthURL() {
  const queryParams = new URLSearchParams({
    redirect_uri: `${oAuthConstants.paths.google.redirect}`,
    client_id: oAuthConfig.google.clientId,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: oAuthConstants.paths.google.scope.join(' '),
  });

  return `${oAuthConstants.paths.google.authorize}?${queryParams.toString()}`;
}

export async function getGoogleTokens(code: string): Promise<GoogleTokens> {
  const request = await axios({
    url: oAuthConstants.paths.google.token,
    method: HttpMethods.POST,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      code,
      client_id: oAuthConfig.google.clientId,
      client_secret: oAuthConfig.google.clientSecret,
      redirect_uri: oAuthConstants.paths.google.redirect,
      grant_type: 'authorization_code',
    },
  });

  if (request.statusText !== 'OK') return null;
  return request.data;
}

export async function getGoogleUser(
  accessToken: string,
  idToken: string,
): Promise<GoogleUser> {
  const { data } = await axios({
    url: `${oAuthConstants.paths.google.user}${accessToken}`,
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  return data;
}
