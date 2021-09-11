import { Component, OnInit, EventEmitter} from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable} from 'rxjs';
import { Task } from 'src/app/Task';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  myTasks: Task[] = [];
  constructor(private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
    const day = await this.storage.get('Date');
    const today: string = new Date().toDateString();
    if ( day.toString() !== today){
      this.storage.clear();
      this.storage.set('Date',today);
      const temp: Task[] = [];
      this.storage.set('myTasks',temp);
    }else {
      const res = await this.storage.get('myTasks');
      const temp: Task[] = [];
      if (!res){
        await this.storage.set('myTasks',temp);
      }

      this.myTasks = await this.storage.get('myTasks');
      //this.getTasks();
      }
    }

  async onCompleteTask(){

  }

  async deleteTask(task: Task){
    this.myTasks = this.myTasks.filter(t => t.id !== task.id);
    await this.storage.set('myTasks',this.myTasks);
  }

   async addTask(task: Task){
    this.myTasks.push(task);
    await this.storage.set('myTasks',this.myTasks);
  }


}
