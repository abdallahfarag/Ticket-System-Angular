import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITicket, MarkTicketAsHandled, Ticket } from '../models/ticket-model';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private url = environment.baseUrl + '/api/Tickets';

  constructor(private httpClient: HttpClient) { }

  getTickets(page: number): Observable<ITicket[]> {
    return this.httpClient.get<ITicket[]>(this.url + '?page=' + page);
  }
  createTicket(ticket: Ticket) {
    return this.httpClient.post(this.url, ticket);
  }
  markTicketAsHandled(ticket: MarkTicketAsHandled) {
    return this.httpClient.put(this.url + '/update-status', ticket);
  }
}