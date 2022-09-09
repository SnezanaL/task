import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { HighlightLoader, HighlightAutoResult } from 'ngx-highlightjs';

declare const hljs: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'task';

  response: any;

  code1 =  `<div class="mx-auto compare-section">
              <button mat-raised-button color="primary" class="compare-btn">Compare</button>
            </div>`;

  code2 =  `{
    "glossary":{
       "title":"example glossary",
       "GlossDiv":{
        "title":"S",
          "GlossList":{
             "GlossEntry":{
                "ID":"SGML",
                "SortAs":"SGML",
                "GlossTerm":"Standard Generalized Markup Language",
                "Acronym":"SGML",
                "Abbrev":"ISO 8879:1986",
                "GlossDef":{
                   "para":"A meta-markup language, used to create markup languages such as DocBook.",
                   "GlossSeeAlso":[
                      "GML",
                      "XML"
                   ]
                },
                "GlossSee":"markup"
             }
          }
       }
    }
 }`;
          
  constructor(private hljsLoader: HighlightLoader) {
    //this.response = HighlightAutoResult;
  }

  onHighlight(e: HighlightAutoResult) {
    var text = "JavaScript";
text = text.split("").join(" ");
console.log(text);
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
