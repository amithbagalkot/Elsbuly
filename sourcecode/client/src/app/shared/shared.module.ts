import { NgModule } from '@angular/core';
import { FooterComponent } from "./footer/footer.component"
import { HeaderComponent } from "./header/header.component"
import { UserMenuComponent } from "./user-menu/user-menu.component"
import {CommonModule} from '@angular/common';
@NgModule({
  imports:[
    CommonModule
  ],
  declarations: [FooterComponent,HeaderComponent,UserMenuComponent],
  exports: [FooterComponent,HeaderComponent,UserMenuComponent]
})
export class SharedModule { }
