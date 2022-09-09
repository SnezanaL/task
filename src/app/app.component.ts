import { HttpService } from './http.service';
import { User } from './user';
import { Component, Pipe } from '@angular/core';
import Swal from 'sweetalert2';
import { HighlightLoader, HighlightAutoResult } from 'ngx-highlightjs';

import { Papa } from 'ngx-papaparse';

declare const hljs: any;

var decIso = new TextDecoder('iso-8859-1');
var decUtf8 = new TextDecoder('utf-8');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'task';
  public userArray: User[] = [];

  obj = {};

  response: any;

  results: any[] = [];

  code1 = `<div class="mx-auto compare-section">
              <button mat-raised-button color="primary" class="compare-btn">Compare</button>
            </div>`;

//   code2 = `{
//     "glossary":{
//        "title":"example glossary",
//        "GlossDiv":{
//         "title":"S",
//           "GlossList":{
//              "GlossEntry":{
//                 "ID":"SGML",
//                 "SortAs":"SGML",
//                 "GlossTerm":"Standard Generalized Markup Language",
//                 "Acronym":"SGML",
//                 "Abbrev":"ISO 8879:1986",
//                 "GlossDef":{
//                    "para":"A meta-markup language, used to create markup languages such as DocBook.",
//                    "GlossSeeAlso":[
//                       "GML",
//                       "XML"
//                    ]
//                 },
//                 "GlossSee":"markup"
//              }
//           }
//        }
//     }
//  }`;

dataCsv;
code2: any;
result1 = [];

  constructor(
    private hljsLoader: HighlightLoader,
    private http: HttpService,
    private papa: Papa
  ) {
  }

  ngOnInit() {
    //this.getData();
    this.getCSv();
    console.log(this.result1)
    this.dataCsv = JSON.stringify(this.result1)
    console.log(this.dataCsv)
   
  }

  getCSv() {
    this.http.getCSV().subscribe({
      next: (data) => {
        this.parseCsv(data);
        console.log(data);
        //this.code2 = data;
        //this.csvToJSON(data);
      },
      error: (error) => {
        //console.log(error);
      },
    });
  }

  parseCsv(s) {
    this.papa.parse(s, {
      complete: (result) => {
        //console.log('Parsed: ', result.data);
        var lines = result.data;
        var headers = lines[0];
        

        for (var i = 1; i < lines.length - 1; i++) {
          var currentline = lines[i];
          var obj = {};

          //console.log(currentline);
          for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
            // console.log(headers[j]);
            // console.log(currentline[j]);
            // console.log(obj);
          }
          this.result1.push(obj);
          
        }
        console.log(this.result1);
        var ff = JSON.stringify(this.result1);
        console.log(ff);
        this.code2 = JSON.stringify(this.result1, null, 4)
        console.log(this.dataCsv)
        return this.result1;


        
        
      },
    });
  }

  tableFromJson() {
    
  }

  // csvToJSON(csv) {
  //   var lines = csv.split('\n');
  //   var result = [];
  //   var headers = lines[0].split(',');

  //   for (var i = 1; i < lines.length -1; i++) {

  //     var obj = {};

  //     let [first, second, ... third] = lines[i].split(",")
  //     //third = tird.join(",");
  //     first = first + ', ' + second;
  //     console.log(first);
  //     console.log(third);

  //     var currentline = lines[i].split(',');
  //     console.log(currentline);

  //     for (var j = 0; j < headers.length; j++) {

  //       obj[headers[j]] = currentline[j];
  //     }

  //     //result.push(obj);
  //   }
  //   // if (callback && (typeof callback === 'function')) {
  //   //     return callback(result);
  //   // }
  //   //return result;
  //   console.log(result);
  // }

  // getData() {
  //   this.http.getCSV().subscribe((data) => {
  //     const list = data.split('\n');
  //     var headers = list[0].split(',');

  //     list.forEach((e) => {
  //       console.log(e);

  //       this.results.push(e);

  //       console.log(this.results);
  //     });
  //   });
  // }
  // encode_utf8(s) {
  //   return unescape(encodeURIComponent(s));
  // }

  // decode_utf8(s) {
  //   return decodeURIComponent(escape(s));
  // }

  onHighlight(e: HighlightAutoResult) {
    //hljs.initLineNumbersOnLoad();
    console.log(e);
    this.response = {
      language: e.language,
      relevance: e.relevance,
      secondBest: '{...}',
      value: '{...}',
    };
  }

  simpleAlert() {
    Swal.fire('Hello world!');
  }

  alertWithSuccess() {
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success');
  }

  confirmBox() {}
}
