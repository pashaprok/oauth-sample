import { AuthService } from '../types/auth.types';
import { getGoogleAuthURL } from '../utils/helpers/oauth/google';
import { getGithubAuthURL } from '../utils/helpers/oauth/github';

export function getRedirectString(service: AuthService) {
  if (service === 'github') return getGithubAuthURL();
  if (service === 'google') return getGoogleAuthURL();
  return '';
}
