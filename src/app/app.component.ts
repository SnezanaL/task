import { DatePipe } from '@angular/common';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { PrettyPrintPipe } from './pipes/pretty-print.pipe';
import { HttpService } from './services/http.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
//Instant code highlighting, auto-detect language
import { HighlightLoader, HighlightAutoResult } from 'ngx-highlightjs';
// Parse CSV 
import { Papa } from 'ngx-papaparse';

declare const hljs: any;
const phonePipe = new PhoneNumberPipe();

// var decIso = new TextDecoder('iso-8859-1');
// var decUtf8 = new TextDecoder('utf-8');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'task';

  @ViewChild('tableCsv', { static: false }) public _html: ElementRef;
  @ViewChild('tablePrn', { static: false }) public _htmlPrn: ElementRef;

  response: any;

  dataCsvHtml: any;
  dataCsv: any;
  jsonCsv: any;
  resultCsv = [];

  jsonPrn: any;
  resultPrn = [];

  constructor(
    private hljsLoader: HighlightLoader,
    private http: HttpService,
    private papa: Papa,
    private elem: ElementRef, //private pipe: PrettyPrintPipe
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.getCSv();
    this.dataCsv = JSON.stringify(this.resultCsv);
    this.getPrn();
  }

  getCSv() {
    this.http.getCSV().subscribe({
      next: (data) => {
        this.parseCsv(data);
        //console.log(data);
      },
      error: (error) => {
        //console.log(error);
      },
    });
  }

  getPrn() {
    this.http.getPrn().subscribe({
      next: (data) => {
        this.prnToCsv(data);
        //console.log(data);
      },
      error: (error) => {
        //console.log(error);
      },
    });
  }

  prnToCsv(s) {
    var lines = s.split('\n');
    var result = [];
    var line = [];
    var headers = lines[0].split(' ');
    for (var i = 0; i < lines.length - 1; i++) {
      result.push([
        lines[i].slice(0, 15).trim(),
        lines[i].slice(16, 37).trim(),
        lines[i].slice(38, 47).trim(),
        lines[i].slice(47, 61).trim(),
        lines[i].slice(62, 74).trim(),
        lines[i].slice(74, 83).trim(),
      ]);
    }
    this.parsePrn(result);
  }

  parseCsv(s) {
    this.papa.parse(s, {
      complete: (result) => {
        var lines = result.data;
        var headers = lines[0];

        var fhr = headers.map((str) => str.replace(/\s/g, '_'));
        //console.log(fhr)

        for (var i = 1; i < lines.length - 1; i++) {
          var currentline = lines[i];
          this.dataCsvHtml = currentline;
          var obj = {};

          // format Postcode
          currentline[2] = currentline[2].toUpperCase().replace(/\s/g, '');

          // clear phone number
          currentline[3] = currentline[3].replace(/[\(\)\-\s]+/g, '');
          currentline[3] = phonePipe.transform(currentline[3]);

          // formar Credit Limit
          currentline[4] = Number(currentline[4]);
          currentline[4] = currentline[4].toFixed(2);
          currentline[4] = currentline[4]
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

          for (var j = 0; j < headers.length; j++) {
            obj[fhr[j]] = currentline[j];
          }
          this.resultCsv.push(obj);
        }
        this.jsonCsv = JSON.stringify(this.resultCsv, null, 4);
      },
    });
  }

  parsePrn(s) {
    var lines = s;
    var headers = lines[0];

    var fhs = headers.map((str) => str.replace(/\s/g, '_'));
    //console.log(fhs);

    for (var i = 1; i < lines.length; i++) {
      var currentline = lines[i];
      this.dataCsvHtml = currentline;

      // clear phone number
      currentline[3] = currentline[3].replace(/[\(\)\-\s]+/g, '');
      currentline[3] = phonePipe.transform(currentline[3]);
      var obj = {};

      // format Date format
      currentline[5] = currentline[5].replace(
        /(\d{4})(\d{2})(\d{2})/,
        '$3/$2/$1'
      );

      // formar Credit Limit
      currentline[4] = Number(currentline[4]);
      currentline[4] = (currentline[4] / 100).toFixed(2);
      currentline[4] = currentline[4]
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      // format Postcode
      currentline[2] = currentline[2].toUpperCase().replace(/\s/g, '');

      for (var j = 0; j < headers.length; j++) {
        obj[fhs[j]] = currentline[j];
      }
      this.resultPrn.push(obj);
    }
    this.jsonPrn = JSON.stringify(this.resultPrn, null, 4);
  }

  isJsonsEqual(json1, json2) {
    if (json1 === json2) {
      Swal.fire({
        icon: 'success',
        title: 'Good!',
        text:'Both JSON files are identical! 😅',
        footer: '<p><span class="affirm">AFFIRMATION</span> This too shall pass. 😉</p>'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'OOps!',
        text:'JSON files are not identical! 😅',
        footer: '<p><span class="affirm">AFFIRMATION</span> I&#39;m stronger than I think. 😉</p>'
      })
    }
  }

  isHtmlsEqual() {
    // console.log(this._htmlPrn)
    // console.log(this._html)
    var htmlCsv = this._html.nativeElement.innerHtml;
    var htmlPrn = this._htmlPrn.nativeElement.innerHtml;

    if (htmlCsv === htmlPrn) {
      Swal.fire({
        icon: 'success',
        title: 'Good!',
        text:'Both Tables are identical! 😅',
        footer: '<p><span class="affirm">AFFIRMATION</span> This too shall pass. 😉</p>'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'OOps!',
        text:'Tables are not identical! 😅',
        footer: '<p><span class="affirm">AFFIRMATION</span> I&#39;m stronger than I think. 😉</p>'
      })
    }
  }

  onHighlight(e: HighlightAutoResult) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      secondBest: '{...}',
      value: '{...}',
    };
  }

}
