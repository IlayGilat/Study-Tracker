import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudyPageRoutingModule } from './study-routing.module';

import { StudyPage } from './study.page';

import { TasksComponent } from 'src/app/components/tasks/tasks.component';
import { TaskItemComponent } from 'src/app/components/task-item/task-item.component';
import { AddTaskComponent } from 'src/app/components/add-task/add-task.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudyPageRoutingModule
  ],
  declarations: [StudyPage, TasksComponent , TaskItemComponent, AddTaskComponent]
})
export class StudyPageModule {}
