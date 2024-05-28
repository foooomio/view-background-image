import { $ } from './utils.js';

/**
 * @param {Error} error
 */
export function showError(error) {
  $('error-details').textContent = error.toString();
  $('error').classList.remove('hidden');
  $('nav').classList.add('hidden');

  const [firefox, version] = navigator.userAgent.match(/Firefox\/(\d+)/) ?? [];
  if (firefox != null && Number(version) < 127) {
    $('error-firefox').classList.remove('hidden');
  }
}
