import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from '../model/interface/Events';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  githubUser: string = "look"; //Change this variable to show a different Github User

  constructor(private http: HttpClient) { }

  callGitHubRestApi() {
    // Make an HTTP GET request to the GitHub API to fetch public events for a specific user
    return this.http.get<Events[]>(`https://api.github.com/users/${this.githubUser}/events/public`).pipe(
        // Use the 'map' operator to transform the response data
        map((res: Events[]) => 
            // Iterate over each event in the response array
            res.map(event => {
                // Create a new Date object from the event's creation date
                const eventDate = new Date(event.created_at);
                // Return a new object for each event with the type and formatted creation date
                return {
                    type: event.type, // The type of the event (e.g., PushEvent, PullRequestEvent)
                    created_at: `${eventDate.getUTCMonth() + 1}/${eventDate.getUTCDate()}/${eventDate.getUTCFullYear()}` // Format date as MM/DD/YYYY
                };
            })
        )
    );
}
  //Returns the username
  returnUser(): string{
    this.githubUser = this.githubUser[0].toUpperCase() + this.githubUser.slice(1); //make the first letter of the Username Capital
    return this.githubUser;
  }
}
