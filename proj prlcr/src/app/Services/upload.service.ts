import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

const url = 'https://node.perfectlancer.com/file/upload';

@Injectable()
export class UploadService {
  constructor(private http: HttpClient) { }

  public upload(
    files: Set<File>
  ): { [key: string]: { progress: Observable<number> , body : {}} } {
    const status: { [key: string]: { progress: Observable<number>, body : {} } } = {};

    files.forEach(file => {
      const formData: FormData = new FormData();
      formData.append('plancer', file, file.name);

      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true
      });

      const progress = new Subject<number>();
      const body = new Subject<{}>();

      const startTime = new Date().getTime();
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((100 * event.loaded) / event.total);
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          body.next(event.body);
          //console.log(event);
          progress.complete();
        }
      });


      status[file.name] = {
        progress: progress.asObservable(),
        body : body.asObservable()
      };
    });

    return status;
  }
}
