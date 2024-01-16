import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'users',
    loadChildren: () => import("./users/users.module").then((m) => m.UsersModule)
  },
  {
    path: 'projects',
    loadChildren: () => import("./projects/projects.module").then((m) => m.ProjectsModule)
  }
];
