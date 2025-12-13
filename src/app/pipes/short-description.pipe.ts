import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription',
  standalone: true,
})
export class ShortDescriptionPipe implements PipeTransform {
  transform(value: string, maxLength: number = 15): string {
    if (!value) return '';
    if (value.length <= maxLength) return value;
    return value.substring(0, maxLength) + '...';
  }
}
