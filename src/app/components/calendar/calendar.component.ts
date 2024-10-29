import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Events } from '../../model/interface/role';
import { map } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{

  roleList: Events[] = [];
  monthlyActivity: number[] = [];
  lastMonthArray: string[] = [];


  restApiService = inject(ApiService);

  ngOnInit(): void{
    this.restApiService.callGitHubRestApi().subscribe((res:Events[])=>{
      this.roleList = res;
    });

    this.calculateMonthlyActivity();
  }

  calculateMonthlyActivity(){

    this.monthlyActivity = new Array(30).fill(0);
    this.lastMonthArray = new Array(30);
    let day = new Date();
    let date = `${day.getMonth()+1}/${day.getDate()}/${day.getFullYear()}`;

    for (let i = 0; i < this.monthlyActivity.length; i++) {
      for (let j = 0; j < this.roleList.length; j++) {
          if(this.roleList[j].created_at === date){
            this.monthlyActivity[i]+=1;
          }     
      }
      this.lastMonthArray[i] = date;
      day.setDate(day.getDate()-1);
      date = `${day.getMonth()+1}/${day.getDate()}/${day.getFullYear()}`;
    }    
  }
}
