import { Pipe, PipeTransform } from '@angular/core';
import { TypedMoney } from '@models/features/cart';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(value: TypedMoney): number {
    return value.centAmount / 100;
  }
}
