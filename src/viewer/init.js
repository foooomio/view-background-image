import { $ } from './utils.js';

export function init() {
  const extName = chrome.i18n.getMessage('extName');
  document.title = extName;
  $('h1').textContent = extName;

  $('review').textContent = '☆ ' + chrome.i18n.getMessage('review');
  $('donation').textContent = '♡ ' + chrome.i18n.getMessage('donation');

  $('error-message').textContent = '⚠️ ' + chrome.i18n.getMessage('failure');
  $('error-reload').textContent = chrome.i18n.getMessage('reload');
  $('error-security').textContent = chrome.i18n.getMessage('security');
  $('error-report').textContent = chrome.i18n.getMessage('report');
}
