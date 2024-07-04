import { $ } from './utils.js';

/**
 * @param {Error} error
 */
export function showError(error) {
  $('error-details').textContent = error.toString();
  $('error').classList.remove('hidden');
  $('nav').classList.add('hidden');

  if (navigator.userAgent.includes('Gecko')) {
    $('error-firefox').classList.remove('hidden');
  }
}
