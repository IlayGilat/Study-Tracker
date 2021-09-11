import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Task } from 'src/app/Task';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;

  constructor(private storage: Storage) {
  }

  ngOnInit() {}

  async onCheking(){
    let myStorage = await this.storage.get('myTasks');
    myStorage = myStorage.filter(t => t.id !== this.task.id);
    myStorage.push(this.task);
    await this.storage.set('myTasks',myStorage);
  }

}
