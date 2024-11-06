import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPostPageRoutingModule } from 'src/app/modules/add-posts/add-posts-routing.module';

import { AddPostPage } from 'src/app/modules/add-posts/add-posts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPostPageRoutingModule
  ],
  declarations: [AddPostPage]
})
export class AddPostPageModule {}