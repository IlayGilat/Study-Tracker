import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-study',
  templateUrl: './study.page.html',
  styleUrls: ['./study.page.scss'],
})
export class StudyPage implements OnInit {
  startStudingTime: Date;
  endStudingTime: Date;
  constructor(private storage: Storage,public alertController: AlertController, public toastController: ToastController) { }

  async ngOnInit() {
    await this.storage.create();
    //console.log(new Date().toDateString());
    const today = new Date().toDateString();
    if(today !== await this.storage.get('Date')){
      console.log('sad');
      await this.storage.set('timeStudied',0);
      await this.storage.set('myTasks',[]);
      await this.storage.set('Date',today);
    }else{

    }
    //if(new Date().getUTCDate())

  }

  async onSubmitStudyHours(){
    if(!this.startStudingTime || !this.endStudingTime){
      this.alertController.create({
        header: 'Error',
        message: 'You need to choose start and end time',
        buttons: ['OK']
      }).then(async res => {

        await res.present();

      });
    }else{
   /* let totalTime = await this.storage.get('timeStudied');
    if(!totalTime){totalTime = 0}
    totalTime += this.tempTime;
    this.tempTime = null;
    await this.storage.set('timeStudied', totalTime);
    console.log(await this.storage.get('timeStudied'));
    */
    let totalTime = await this.storage.get('timeStudied');
    if(!totalTime){totalTime = 0;}


    const strStartTime = this.startStudingTime.toString();
    const strEndTime = this.endStudingTime.toString();
    const intTime: number = ((parseInt(strEndTime.substr(11,2), 10)-parseInt(strStartTime.substr(11,2),10) )*60 )+
    ((parseInt(strEndTime.substr(14,2), 10)-parseInt(strStartTime.substr(14,2),10))) ;

    totalTime += intTime;
    await this.storage.set('timeStudied', totalTime);
    this.endStudingTime = null;
    this.startStudingTime = null;
    const toast = await this.toastController.create({
      message: 'Added Time Sudied Succsesfully',
      position: 'bottom',
      color:'success',
      duration: 2000
    });
    await toast.present();

    }
  }

}
