import type { RouteMeta, Router, RouteRecordRaw } from 'vue-router';

import type { MenuRecordRaw } from '@vh5-core/typings';

function joinPath(parent: string, child: string) {
  if (child.startsWith('/')) return child;
  return `${parent.replace(/\/$/u, '')}/${child}`;
}

export function generateMenus(
  routes: RouteRecordRaw[],
  router: Router,
): MenuRecordRaw[] {
  const resolvedPaths = new Map(
    router.getRoutes().map((route) => [route.name, route.path]),
  );

  function buildMenus(
    records: RouteRecordRaw[],
    parent?: string,
    parents: string[] = [],
  ): MenuRecordRaw[] {
    return records
      .filter((route) => !route.meta?.hideInMenu)
      .map((route) => {
        const resolvedPath = route.name
          ? resolvedPaths.get(route.name)
          : undefined;
        const path =
          resolvedPath ?? (parent ? joinPath(parent, route.path) : route.path);
        const meta: Partial<RouteMeta> = route.meta ?? {};
        const currentParents = parent ? [...parents, parent] : parents;
        return {
          badge: meta.badge as string | undefined,
          badgeType: meta.badgeType as 'dot' | 'normal' | undefined,
          badgeVariants: meta.badgeVariants as string | undefined,
          children: meta.hideChildrenInMenu
            ? []
            : buildMenus(route.children ?? [], path, currentParents),
          icon: typeof meta.icon === 'string' ? meta.icon : undefined,
          name: String(meta.title ?? route.name ?? path),
          order: typeof meta.order === 'number' ? meta.order : undefined,
          parent,
          parents: parent ? currentParents : undefined,
          path,
          show: true,
        } satisfies MenuRecordRaw;
      })
      .toSorted(
        (a, b) =>
          (a.order ?? Number.MAX_SAFE_INTEGER) -
          (b.order ?? Number.MAX_SAFE_INTEGER),
      );
  }

  return buildMenus(routes);
}
