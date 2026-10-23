import {
  routeLoadFailed as enFailed,
  reloadPage as enReload,
} from './langs/en-US/mobile.json';
import {
  routeLoadFailed as jaFailed,
  reloadPage as jaReload,
} from './langs/ja-JP/mobile.json';
import {
  routeLoadFailed as zhFailed,
  reloadPage as zhReload,
} from './langs/zh-CN/mobile.json';

// This code also runs when the normal i18n bootstrap cannot load.
export function getStartupErrorMessages() {
  try {
    const locale = localStorage.getItem('vh5:locale');
    if (locale === 'zh-CN')
      return { failed: zhFailed, lang: locale, reload: zhReload };
    if (locale === 'ja-JP')
      return { failed: jaFailed, lang: locale, reload: jaReload };
  } catch {
    // Storage may be unavailable in a private WebView.
  }
  return { failed: enFailed, lang: 'en-US', reload: enReload };
}
