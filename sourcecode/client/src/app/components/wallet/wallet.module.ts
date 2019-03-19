import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './wallet/wallet.component';
import { WalletRoutingModule } from './wallet-routing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module'
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatButtonModule, MatCheckboxModule, MatTableModule } from '@angular/material';
import { TimeZoneDatePipe } from '../../filter/date.pipe';

@NgModule({
    imports: [
        CommonModule,
        WalletRoutingModule,
        FormsModule,
        SharedModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTableModule
    ],
    declarations: [
        WalletComponent,
        TimeZoneDatePipe
    ]
})

export class WalletModule {

}