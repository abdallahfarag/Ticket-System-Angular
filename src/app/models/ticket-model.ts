import { TicketStatus } from "../enums/ticket-status";

export interface ITicket {
    id: number;
    phone: string;
    status: TicketStatus;
    governorateId: number;
    cityId: number;
    districtId: number;
    createdAt: string;
}

export class Ticket {
    constructor(_phone: string, _governorateId: number, _cityId: number, _districtId: number) {
        this.phone = _phone;
        this.governorateId = _governorateId;
        this.cityId = _cityId;
        this.districtId = _districtId;
    }
    phone!: string;
    status: TicketStatus = TicketStatus.Created;
    governorateId!: number;
    cityId!: number;
    districtId!: number;
}

export class MarkTicketAsHandled {
    constructor(_id: number) {
        this.id = _id;
    }
    id!: number;
    status: TicketStatus = TicketStatus.Handled;
}

export class TicketStatusSignalRMessage {
    ticketId!: number;
    status!: TicketStatus;
}