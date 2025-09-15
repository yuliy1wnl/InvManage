import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus',
  standalone: true
})
export class OrderStatusPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'DEL':
        return '✅ Delivered';
      case 'PEND':
        return '🕒 Pending';
      case 'CANC':
        return '❌ Cancelled';
      default:
        return value;
    }
  }
}
