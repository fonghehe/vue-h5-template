import { getStartupErrorMessages } from '@vh5/locales/startup';

import './startup-error.css';

export function showStartupError() {
  const root = document.querySelector('#app');
  if (!root) return;

  const messages = getStartupErrorMessages();
  const alert = document.createElement('div');
  alert.className = 'startup-error';
  alert.lang = messages.lang;
  alert.setAttribute('role', 'alert');

  const message = document.createElement('p');
  message.textContent = messages.failed;
  const retry = document.createElement('button');
  retry.type = 'button';
  retry.textContent = messages.reload;
  retry.addEventListener('click', () => location.reload());

  alert.append(message, retry);
  root.replaceChildren(alert);
}
