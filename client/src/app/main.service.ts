import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'Rxjs';

@Injectable()
export class MainService {
  allQuotesArray: object[]
  allQuotes: BehaviorSubject<any[]> = new BehaviorSubject([])
  constructor(private _http: Http) { }
  AddQuote(quote, cb) {
    this._http.post('/add_quote', quote).subscribe((res) => {
      this.GrabAllQuotes();
    })
  }

  GrabAllQuotes() {
    this._http.get('/grab_all_quotes').subscribe((res) => {
      this.allQuotesArray = res.json();
      this.allQuotes.next(this.allQuotesArray);
    })
  }

  login(user, cb) {
    this._http.post('/login', user).subscribe((res) => {
      return cb(res.json());
    })
  }

  CheckSession(cb) {
    this._http.get('/dashboard_backend').subscribe((res) => {
      return cb(res.json());
    })
  }
}
