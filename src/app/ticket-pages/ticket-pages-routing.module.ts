import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketAddComponent } from './ticket-add/ticket-add.component';
import { TicketListingComponent } from './ticket-listing/ticket-listing.component';

const routes: Routes = [
  { path: '', component: TicketListingComponent },
  { path: 'add', component: TicketAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketPagesRoutingModule { }
