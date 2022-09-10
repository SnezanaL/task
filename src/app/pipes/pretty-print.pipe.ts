import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyprint'
})
export class PrettyPrintPipe implements PipeTransform {

  // transform(val) {
  //   return val
  //     .replace(/ /g, '')
     // .replace(/ /g, '<span class="hljs-punctuation"></span>')
      //.replace(/\n/g, '<br/>');

      transform(value: string): string {
        return value? value.replace(/_/g, "") : value;
  }

}