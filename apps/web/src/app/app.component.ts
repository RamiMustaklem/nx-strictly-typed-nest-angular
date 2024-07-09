import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TextColorCombination } from '@utils';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'nestjs-api-angular-mono-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent {
  title = 'User Management App';

  activeNavClass: TextColorCombination = 'text-red-500';
  inactiveNavClass: TextColorCombination = 'text-slate-800';

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

  constructor() { }

  onNavChange(event: boolean, url: string) {
    this.navLinks = this.navLinks.map((link) => {
      if (link.url === url) {
        return { ...link, textColor: this.activeNavClass };
      }
      return { ...link, textColor: this.inactiveNavClass };
    });
  }
}
