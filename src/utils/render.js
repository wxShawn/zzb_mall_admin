import { h } from 'vue';
import { NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';

export default {
  nIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
  },
  routerLink(routerName, linkTitle) {
    return () => h(RouterLink, {
      to: {
        name: routerName,
      }
    }, { default: () => linkTitle });
  },
}