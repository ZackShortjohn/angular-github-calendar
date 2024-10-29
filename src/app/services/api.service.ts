import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from '../model/interface/role';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  callGitHubRestApi(){
    return this.http.get<Events[]>("https://api.github.com/users/look/events/public").pipe(
      map((res: Events[])=> 
        res.map(event => {
          const eventDate = new Date(event.created_at);
          return {
            type: event.type,
            created_at: `${eventDate.getUTCMonth() + 1}/${eventDate.getUTCDate()}/${eventDate.getUTCFullYear()}`
          };
        })
      )
    )
  }
}
