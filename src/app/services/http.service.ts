import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const file = 'assets/Workbook2.csv';
var decIso = new TextDecoder("iso-8859-1");
var decUtf8 = new TextDecoder("utf-8");
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers = new HttpHeaders()
  .set('Accept', 'application/json, text/plain, */*')
  .set('decoding', 'windows-1252')
  .set('content-type', 'text/plain;charset=windows-1252')
  .set('Access-Control-Allow-Origin', '*')
  .set('Accept-Language', 'da, en-gb;q=0.8, en;q=0.7;no,nl;q=0.5');

  constructor(private http: HttpClient) { }
  

  getCSV(): Observable<any> {
    //let url = decUtf8('assets/Workbook2.csv')
    return this.http.get('assets/Workbook2.csv', {headers: this.headers, responseType: 'text'} )
    .pipe( map(data => data),
    catchError(err => {
      return throwError(err);
    }));
  }

  getPrn(): Observable<any> {
    //let url = decUtf8('assets/Workbook2.csv')
    return this.http.get('assets/Workbook2.prn', { responseType: 'text'} )
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
