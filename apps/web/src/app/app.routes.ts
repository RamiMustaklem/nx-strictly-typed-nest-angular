import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'users',
    loadChildren: () => import("./users/users.module").then((m) => m.UsersModule)
  }
];
