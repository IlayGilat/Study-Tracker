import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PickerController, PickerOptions } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  desirableTime: Date;
  desirableTimeNumber: number;
  constructor(private storage: Storage,private router: Router) { }

  async ngOnInit() {
    this.storage.create();
    this.desirableTime = await this.storage.get('desirableTime');
    this.desirableTimeNumber = this.dateTimeToNumber(this.desirableTime);
  }

  async onDesirableTimeChange(){
    await this.storage.set('desirableTime',this.desirableTime);
    const intTime: number = this.dateTimeToNumber(this.desirableTime);
    this.desirableTimeNumber = intTime;
    }

  dateTimeToNumber(myDate: Date): number{
    return parseInt(myDate.toString().substr(11,2), 10)*60 +
    parseInt(myDate.toString().substr(14,2), 10) ;
  }

  openAbout(){
    this.router.navigateByUrl('/tab-nav/about');
  }
}
