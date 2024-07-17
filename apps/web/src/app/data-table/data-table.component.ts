import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GenericEntityWithId } from '@utils';

@Component({
  selector: 'nestjs-api-angular-mono-data-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class DataTableComponent<T extends GenericEntityWithId<T>> {
  @Input() headers: { label: string, value: keyof T }[];
  @Input() dataItems: T[];
  @Input() baseURI: string;
  @Input() clickToEdit: keyof T;

  isFieldOfTypeDate(value: T[keyof T]): boolean {
    return !isNaN(Date.parse(value))
  }
}
