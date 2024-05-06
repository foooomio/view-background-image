import { $ } from './utils.js';

export class ConnectionError extends Error {}
export class NotFoundError extends Error {}

/**
 * @param {Error} error
 */
export function showError(error) {
  $('error').append(error.message);
  $('error').classList.remove('hidden');
}
