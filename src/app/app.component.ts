import { PrettyPrintPipe } from './pretty-print.pipe';
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

  // code1 = `<div class="mx-auto compare-section">
  //             <button mat-raised-button color="primary" class="compare-btn">Compare</button>
  //           </div>`;

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
  code1: any;
  dataCsvHtml;

  dataCsv;
  jsonCsv: any;
  result1 = [];

  jsonPrn: any;
  result2 = [];

  constructor(
    private hljsLoader: HighlightLoader,
    private http: HttpService,
    private papa: Papa
  ) //private pipe: PrettyPrintPipe
  {}

  ngOnInit() {
    //this.getData();
    this.getCSv();
    //console.log(this.result1);
    this.dataCsv = JSON.stringify(this.result1);
    //console.log(this.result1);
    this.getPrn();

    //     this.code1 = `<div class="container-analyzer">
    //     <table>
    //         <thead>
    //           <th>Date</th>
    //           <th>Open</th>
    //           <th>High</th>
    //           <th>Low</th>
    //           <th>Close</th>
    //           <th>Volume</th>
    //         </thead>
    //         <tbody *ngFor="let data of result1">
    //             <tr>
    //                 <td>{{data.Name}}</td>
    //                 <td>{{data.Address}}</td>
    //             </tr>
    //         </tbody>
    //       </table>
    // </div>`

    //console.log(this.code1)
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

  getPrn() {
    this.http.getPrn().subscribe({
      next: (data) => {
        this.prnToCsv(data);
        console.log(data);
        //this.code2 = data;
        //this.csvToJSON(data);
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
    var first: String;
    var second: string;
    // for each line in lines
    // var line = string (lines[i].substring(0,15) + , + lines[i].substring1(5,22).....)
    for (var i = 0; i < lines.length -1; i++) {
      first = lines[0].substring(0,15).trim()
      second = lines[1].substring(16,37).trim()

      console.log(first)
      result.push([lines[i].slice(0,15).trim(),lines[i].slice(16,37).trim(),lines[i].slice(38,47).trim(),lines[i].slice(47, 60).trim(),lines[i].slice(61, 74).trim(),lines[i].slice(74, 83).trim()]);
      //console.log(result)


      //this.parsePrn(result)

    }
    this.parsePrn(result)
    // console.log(lines)
     console.log(result)

  }

  parseCsv(s) {
    this.papa.parse(s, {
      complete: (result) => {
        console.log('Parsed: ', result.data);
        var lines = result.data;
        var headers = lines[0];
        console.log(headers)

        var ffs = headers.map((str) => str.replace(/\s/g, '_'));
        //console.log(ffs)

        for (var i = 1; i < lines.length - 1; i++) {
          var currentline = lines[i];
          this.dataCsvHtml = currentline;
          var obj = {};

          //console.log(currentline);
          for (var j = 0; j < headers.length; j++) {
            obj[ffs[j]] = currentline[j];
            // console.log(headers[j]);
            // console.log(currentline[j]);
            // console.log(obj);
          }
          this.result1.push(obj);
        }
        //console.log(this.result1);
        var replacedKey = Object.keys(this.result1);
        //console.log(replacedKey);
        var ff = JSON.stringify(this.result1);
        //console.log(ff);
        this.jsonCsv = JSON.stringify(this.result1, null, 4);
        //console.log(this.dataCsv);
        //return this.result1;
      },
    });
  }

  parsePrn(s) {
    //this.papa.parse(s, {
      //complete: 
      
        //console.log('Parsed: ', result.data);
        var lines = s;
        var headers = lines[0];
        console.log(headers)

         var ffs = headers.map((str) => str.replace(/\s/g, '_'));
         console.log(ffs)

        for (var i = 1; i < lines.length; i++) {
          var currentline = lines[i];
          this.dataCsvHtml = currentline;
          var obj = {};

          console.log(currentline);
          for (var j = 0; j < headers.length; j++) {
            obj[ffs[j]] = currentline[j];
            // console.log(headers[j]);
            // console.log(currentline[j]);
            // console.log(obj);
          }
          this.result2.push(obj);
        }
        console.log(this.result2);
        var replacedKey = Object.keys(this.result2);
        //console.log(replacedKey);
        var ff = JSON.stringify(this.result2);
        //console.log(ff);
        this.jsonPrn = JSON.stringify(this.result2, null, 4);
        //console.log(this.dataCsv);
        //return this.result1;
  

  }

  tableFromJson() {
    let col = [];
    for (let i = 0; i < this.result1.length; i++) {
      for (let key in this.result1[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }

    // Create table.
    const table = document.createElement('table');

    // Create table header row using the extracted headers above.
    let tr = table.insertRow(-1); // table row.

    for (let i = 0; i < col.length; i++) {
      let th = document.createElement('th'); // table header.
      th.innerHTML = col[i];
      tr.appendChild(th);
      console.log(th);
    }

    // add json data to the table as rows.
    for (let i = 0; i < this.result1.length; i++) {
      tr = table.insertRow(-1);

      for (let j = 0; j < col.length; j++) {
        let tabCell = tr.insertCell(-1);
        tabCell.innerHTML = this.result1[i][col[j]];
      }
    }

    // Now, add the newly created table with json data, to a container.
    const divShowData = document.getElementById('showData');
    divShowData.innerHTML = '';
  }

  isJsonsEquals(json1, json2) {
    if(json1 === json2) {
      alert('oba jsona su ista')
    } else {
      alert('nisu isti jsoni')
    }

  }

  // PipeFunction(value) {
  //   this.pipe.transform(value);
  // }

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
    //console.log(e);
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
