import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Api} from './Api';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

// const HttpOptionsForm =
// {
// 	headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
// };

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private HTTP: HttpClient;

  constructor(HTTP: HttpClient) {
    this.HTTP = HTTP;
  }

  public getPorjects() {
    return this.HTTP.get<any>(Api.BASE_URL + 'projects', HttpOptions)
  }

}
