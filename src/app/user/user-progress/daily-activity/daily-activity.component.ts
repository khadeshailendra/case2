import { Component, OnInit } from '@angular/core';
import { profile } from 'src/app/model/profile';
import { exercise } from 'src/app/model/exercise';
import { workout } from 'src/app/model/workout';
import { ProfileService } from 'src/app/services/profile.service';
import { WorkoutService } from 'src/app/services/workout.service';
import { ProgressService } from 'src/app/services/progress.service';

@Component({
  selector: 'app-daily-activity',
  templateUrl: './daily-activity.component.html',
  styleUrls: ['./daily-activity.component.css']
})
export class DailyActivityComponent implements OnInit {
profile:profile;
exercises:exercise[]=[];
workout:workout;
status:any[]=[];
weight:number;
calories:number;
mins: number=0;
secs: number=0;
currentinterval:any;
currentActivity:string= "None";
currentIndex:number;
watchtoggle:boolean=true;
currentDuration:number;

  constructor(private ps:ProfileService,private ws:WorkoutService,private pss:ProgressService) { }

  ngOnInit(): void {

      this.ps.getProfile().subscribe(
        (profile:profile)=>{
           this.profile=profile;
           this.ws.getWorkoutByName(this.profile.subscription).subscribe(
             (workout:workout)=>{
               this.workout=workout
               this.ws.getWorkoutmap(this.workout.id).subscribe(
                 (data:any[])=>{
                       for(let x in data){
                         this.exercises.push(data[x].exercise)
                          this.pss.getStatus(data[x].exercise.id).subscribe(
                             (data:any)=>this.status[x]={status: data.status, duration: 0}
                          )
                       }
                   
                 }
               )
              }
           )
        }
      )
  }

   currentSelection(index){
     alert(this.status[index])
     if(this.status[index].status=="incomplete"){
           this.currentActivity=this.exercises[index].name;
           this.currentIndex=index;
           this.status[this.currentIndex].status="pending";
     }
     else{
         alert("This Activity is Up for the day");
     }
   }
  timer(){
    if(this.currentActivity=="None")
         alert("You have not selected any Exercise")
    else{
    this.watchtoggle=false;
    this.secs=0;this.mins=0;
        this.currentinterval=setInterval(()=>{
            this.secs++;
            if(this.secs==60){
                 this.mins++;
                 this.secs=0;
            }
        },1000)
      }
  }

  stop(){
         clearInterval(this.currentinterval);
         this.watchtoggle=true;
  }

  finish(){
     if(confirm("Are you finished this exercise?")){
        this.currentDuration=Math.round(this.mins+ (this.secs/30));
        this.secs=0;this.mins=0;
        clearInterval(this.currentinterval);
        
     }
  }
}
