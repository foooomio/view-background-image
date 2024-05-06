import { $ } from './utils.js';

export function init() {
  const extName = chrome.i18n.getMessage('extName');
  document.title = extName;
  $('h1').textContent = extName;

  $('feedback').textContent = '☆ ' + chrome.i18n.getMessage('feedback');
  $('donation').textContent = '♡ ' + chrome.i18n.getMessage('donation');
}
