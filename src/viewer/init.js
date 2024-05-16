import { $ } from './utils.js';

export function init() {
  const extName = chrome.i18n.getMessage('extName');
  document.title = extName;
  $('h1').textContent = extName;

  $('error-message').textContent = chrome.i18n.getMessage('failure');
  $('error-reload').textContent = chrome.i18n.getMessage('reload');
  $('error-security').textContent = chrome.i18n.getMessage('security');
  $('error-report').textContent = chrome.i18n.getMessage('report');

  $('feedback').textContent = '☆ ' + chrome.i18n.getMessage('feedback');
  $('donation').textContent = '♡ ' + chrome.i18n.getMessage('donation');
}
