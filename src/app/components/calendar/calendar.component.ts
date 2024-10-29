import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Events } from '../../model/interface/Events';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{

  eventList: Events[] = []; //Holds the user's type and date of contributions
  monthlyActivity: number[] = []; //Holds the number of contributions for each one of the 30 days
  lastMonthArray: string[] = []; //Holds the 30 days starting from the current day and before
  user: string = ""; //Holds the random user's username


  restApiService = inject(ApiService); //We call the service that connects with the api

  ngOnInit(): void{
    this.restApiService.callGitHubRestApi().subscribe((res:Events[])=>{
      this.eventList = res; //add the events from the api to the eventsList
    });

    this.user = this.restApiService.returnUser();
    this.calculateMonthlyActivity();
  }

  calculateMonthlyActivity(){

    this.monthlyActivity = new Array(30).fill(0);
    this.lastMonthArray = new Array(30);
    let day = new Date();
    let date = `${day.getMonth()+1}/${day.getDate()}/${day.getFullYear()}`; //Get current date to string form

    for (let i = 0; i < this.monthlyActivity.length; i++) { //for each of the 30 days
      for (let j = 0; j < this.eventList.length; j++) { //check how many contributions happened on this date
          if(this.eventList[j].created_at === date){ //compare the dates
            this.monthlyActivity[i]+=1;
          }     
      }
      this.lastMonthArray[i] = date;
      day.setDate(day.getDate()-1); //Check for the previous day
      date = `${day.getMonth()+1}/${day.getDate()}/${day.getFullYear()}`; //Turn in it into a string to compare
    }    
  }
}
