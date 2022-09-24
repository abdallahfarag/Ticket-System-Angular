import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketPagesRoutingModule } from './ticket-pages-routing.module';
import { TicketListingComponent } from './ticket-listing/ticket-listing.component';
import { TicketAddComponent } from './ticket-add/ticket-add.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TicketListingComponent,
    TicketAddComponent
  ],
  imports: [
    CommonModule,
    TicketPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ]
})
export class TicketPagesModule { }
