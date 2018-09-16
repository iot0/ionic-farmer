import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64'
})
export class Base64Pipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return "data:image/jpeg;base64,"+value;
  }

}
