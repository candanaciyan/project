import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MainDialogueComponent } from './components/main-dialogue/main-dialogue.component';


@NgModule({
  declarations: [
    ProductCardComponent,
    MainDialogueComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [
    ProductCardComponent,
  ],

})
export class SharedModule { }
