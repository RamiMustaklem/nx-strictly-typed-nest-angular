import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BgColorCombination, TextColorCombination } from '@typeorm';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'nestjs-api-angular-mono-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'User Management App';

  activeNavClass: [TextColorCombination, BgColorCombination] = ['text-red-500', 'bg-orange-200'];

  navLinks: { label: string, url: string }[] = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Users',
      url: '/users',
    },
    {
      label: 'Projects',
      url: '/projects',
    },
  ];

  constructor(private readonly router: Router) {
    // console.log(this.router.navigate(['/users']));
  }
}
