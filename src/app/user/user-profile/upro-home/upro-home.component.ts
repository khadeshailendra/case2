import { Component, OnInit } from '@angular/core';
import { profile } from 'src/app/model/profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-upro-home',
  templateUrl: './upro-home.component.html',
  styleUrls: ['./upro-home.component.css']
})
export class UproHomeComponent implements OnInit {
profile:profile;
  constructor(private ps:ProfileService) { }

  ngOnInit(): void {
      this.ps.getProfile().subscribe(
        (data:profile)=>this.profile=data,
          ()=>{}
      )
  }


}
