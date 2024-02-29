import { InjectionToken } from '@angular/core';

const APPLICATION_NAME = 'RECIPO-MAT';

const HOME_PAGE_TITLE = {
  cs: 'Domů' + ' | ' + APPLICATION_NAME,
  en: 'Home' + ' | ' + APPLICATION_NAME,
};
const SEARCH_PAGE_TITLE = {
  cs: 'Vyhledat recept' + ' | ' + APPLICATION_NAME,
  en: 'Recipe search' + ' | ' + APPLICATION_NAME,
};

export const APP_PAGE_TITLE = {
  HOMEPAGE: HOME_PAGE_TITLE,
  SEARCH: SEARCH_PAGE_TITLE,
};

// TODO add meta tags

const ContentSecurityPolicy =
  "default-src 'self'; style-src 'self' 'nonce-randomNonceGoesHere'; script-src 'self' 'nonce-randomNonceGoesHere';";
export const CONTENT_SECURITY_POLICY_TOKEN = new InjectionToken<string>(
  'ContentSecurityPolicyHeaders',
  { providedIn: 'root', factory: () => ContentSecurityPolicy }
);
