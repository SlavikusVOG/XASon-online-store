import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultValue',
})
export class DefaultValuePipe implements PipeTransform {
  transform(value: unknown, defaultValue = 'N/A'): unknown {
    value ??= defaultValue;
    return value;
  }
}
