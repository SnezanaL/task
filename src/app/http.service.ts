import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const file = 'assets/Workbook2.csv';
var decIso = new TextDecoder("iso-8859-1");
var decUtf8 = new TextDecoder("utf-8")

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers = new HttpHeaders()
  .set('content-type', 'text/csv;charset=EUC-JP')
  .set('encoding', 'ISO-8859-1')

  constructor(private http: HttpClient) {
    console.log(file)
   }
  

  getCSV(): Observable<any> {
    //let url = decUtf8('assets/Workbook2.csv')
    return this.http.get('assets/Workbook2.csv', {headers: this.headers, responseType: 'text'} )
    .pipe( map(data => data),
    catchError(err => {
      return throwError(err);
    }));
  }

  encode_utf8(s) {
    return unescape(encodeURIComponent(s));
  }

  decode_utf8(s) {
    return decodeURIComponent(escape(s));
  }
}
