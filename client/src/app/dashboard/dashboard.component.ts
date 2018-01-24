import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string
  quote: object = { content: "" }
  errorMsg: string = ""
  allQuotes: object[] = []
  constructor(private _mainService: MainService, private _router: Router) {
    this._mainService.allQuotes.subscribe((allQuotes) => {
      this.allQuotes = allQuotes;
    })
    this._mainService.GrabAllQuotes();
  }
  AddQuote() {
    this.quote['content'] = this.quote['content'].trim();
    if (this.quote['content'].length > 1) {
      this.errorMsg = "";
      this._mainService.AddQuote(this.quote, () => {
      });
      this.quote['content'] = "";
    } else {
      this.errorMsg = "Quote must be at least two characters.";
      this.quote['content'] = "";
    }
  }
  ngOnInit() {
    this._mainService.CheckSession((userName) => {
      if (userName['user']) {
        this.userName = userName['user'];
        console.log(this.userName);
      } else {
        this._router.navigate(['/']);
      }
    })
  }

}
