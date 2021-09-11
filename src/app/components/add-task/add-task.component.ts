import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { Task } from 'src/app/Task';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  text: string = '';

  constructor(private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();

  }

  async onSubmit(){
    if(!this.text){
      return;
    }
    const myId: number = await this.storage.get('idCounter');
    const newId: number = myId +1;
    this.storage.set('idCounter',newId);
    const newTask: Task = {text:this.text,id:myId,done:false};
    this.onAddTask.emit(newTask);

    this.text = '';
  }

}
