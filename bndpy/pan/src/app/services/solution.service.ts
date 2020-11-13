import { Injectable } from '@angular/core';
import { SolutionModel } from 'src/app/shared/models/solution.model';
import { env } from 'src/app/shared/env-consts';
import { HttpHeaders, HttpRequest, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  solutionsChanged = new Subject<SolutionModel[]>();
  solutionChanged= new Subject<SolutionModel>();

  constructor(private httpClient: HttpClient,private auService: AuthService) { }

  getAll() {


    const req = this.httpClient.get<SolutionModel[]>( 'admin/solutions/'  , {
      observe: 'body',
      responseType: 'json',

    }) ;

    return  req;
  }

   getById(id: string)  {


    const req =this.httpClient.get<SolutionModel>('admin/solutions/' + id, {
      observe: 'body',
      responseType: 'json',

    }) ;

    return req;
  }

  addSolution(solution: SolutionModel, file) {

    const body = new FormData();

    body.append('title', solution.title);
    body.append('titleEnglish', solution.titleEnglish);
    body.append('description', solution.description);
    body.append('tags', solution.tags);
    body.append('kind', solution.kind);
    body.append('logo', file, file.name);

    const req = new HttpRequest('POST','admin/solutions/create', body,
    {
       reportProgress: true
    });

    return this.httpClient.request(req);
  }

  updateSolution(solution: SolutionModel, file , id: string) {

    const body = new FormData();
    let req;
    if (file) {
      body.append('title', solution.title);
      body.append('titleEnglish', solution.titleEnglish);
      body.append('description', solution.description);
      body.append('tags', solution.tags);
      body.append('kind', solution.kind);
      body.append('logo', file, file.name);
      req = new HttpRequest('PATCH','admin/solutions/edit/' + id, body,
        {

          reportProgress: true
        });
    } else if (solution.logo.length > 0) {
      solution.logo = solution.logo.slice(env.assestUrl.length , solution.logo.length);
      req = new HttpRequest('PATCH','admin/solutions/edit/' + id, solution,
        {

          reportProgress: true
        });
    }
    return this.httpClient.request(req);
  }

  deleteSolution(id: string) {
    const req = new HttpRequest('DELETE','admin/solutions/remove/' + id, null,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  deleteSolutionProducts(solutionId : string, productId:string){
    const req = new HttpRequest('POST','admin/solutions/removeProduct/' + solutionId,  {productId: productId} ,
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }

  addSolutionProducts(solutionId: string, productId: string) {
    console.log(solutionId , productId );

    const req = new HttpRequest('POST','admin/solutions/addProduct/' + solutionId, {productId: productId},
      {

        reportProgress: true
      });

    return this.httpClient.request(req);
  }
}
