import { $ } from './utils.js';

/**
 * @param {Error} error
 */
export function showError(error) {
  $('error-details').textContent = String(error);
  $('error').classList.remove('hidden');
}
