import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILinearData } from '../models/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwfServiceService {
  _STEP1URL = './assets/data/Step1.json';
  _STEP2URL = './assets/data/Step2.json';

  Activity2_STEP1URL = './assets/data/Activity2_Step1.json';
  Activity2_STEP2URL = './assets/data/Activity2_Step2.json';

  constructor(private http: HttpClient) {}

  getStep1Data() {
    return this.http.get(this._STEP1URL, { responseType: 'json' });
  }
  getStep2Data() {
    return this.http.get(this._STEP2URL, { responseType: 'json' });
  }

  getAct2Step1Data() {
    return this.http.get(this.Activity2_STEP1URL, { responseType: 'json' });
  }
  getAct2Step2Data() {
    return this.http.get(this.Activity2_STEP2URL, { responseType: 'json' });
  }
}
