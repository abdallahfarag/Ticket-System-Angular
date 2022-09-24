import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketStatus } from 'src/app/enums/ticket-status';
import { Mocks } from 'src/app/mocks/mocks-data';
import { PagingConfig } from 'src/app/models/paging-config';
import { ITicket, MarkTicketAsHandled, TicketStatusSignalRMessage } from 'src/app/models/ticket-model';
import { TicketsService } from 'src/app/services/tickets.service';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ticket-listing',
  templateUrl: './ticket-listing.component.html',
  styleUrls: ['./ticket-listing.component.css']
})
export class TicketListingComponent implements OnInit {
  title = 'Tickets';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  tableSize: number[] = [5, 10, 15, 20];
  tickets = new Array<ITicket>();
  pagingConfig: PagingConfig = {} as PagingConfig;

  governorates = Mocks.governorates;
  cities = Mocks.cities;
  districts = Mocks.districts;

  constructor(private service: TicketsService, private router: Router) { }

  ngOnInit(): void {
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }

    this.getTickets();
    this.initializeSignalRHub();
  }
  getTickets() {
    this.service.getTickets(this.pagingConfig.currentPage)
      .subscribe((response: any) => {
        this.tickets = response.result.items;
        this.pagingConfig.totalItems = response.totalCount;
      });
  }
  initializeSignalRHub() {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.baseUrl + '/ticket-notify')
      .build();

    connection.start().then(function () {
      debugger;
      console.log('SignalR Connected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("BroadcastMessage", (message: TicketStatusSignalRMessage) => {
      debugger;
      this.tickets.find(x => x.id == message.ticketId)!.status = message.status;
    });
  }
  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.getTickets();
  }
  onTableSizeChange(event: any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.getTickets();
  }
  addTicket() {
    this.router.navigateByUrl('/tickets/add');
  }
  handleTicket(ticketId: number) {
    this.service.markTicketAsHandled(new MarkTicketAsHandled(ticketId))
      .subscribe((response: any) => {
        this.getTickets();
      });
  }
  ticketHandleTimeExpired(ticket: ITicket) {
    const hourInMilliseconds = 60 * 60 * 1000;
    const oneHourAgo = Date.now() - hourInMilliseconds;
    return new Date(ticket.createdAt).getMilliseconds() > oneHourAgo || ticket.status == TicketStatus.Handled;
  }
  getGovernorateName(governorateId: number) {
    var governorate = this.governorates.find(x => x.id == governorateId);
    return governorate!.name;
  }
  getCitiesName(cityId: number) {
    var city = this.cities.find(x => x.id == cityId);
    return city!.name;
  }
  getDistrictName(districtId: number) {
    var district = this.districts.find(x => x.id == districtId);
    return district!.name;
  }
  getStatusColor(ticketStatus: TicketStatus) {
    switch (ticketStatus) {
      case TicketStatus.Yellow:
        return { 'background-color': 'yellow' };
      case TicketStatus.Green:
        return { 'background-color': 'green' };
      case TicketStatus.Blue:
        return { 'background-color': 'blue' };
      case TicketStatus.Red:
        return { 'background-color': 'red' };
      default:
        return { 'background-color': 'white' };
    }
  }
  getStatusName(ticketStatus: TicketStatus) {
    return TicketStatus[ticketStatus];
  }
}
