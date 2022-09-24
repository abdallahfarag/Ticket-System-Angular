import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mocks } from 'src/app/mocks/mocks-data';
import { Ticket } from 'src/app/models/ticket-model';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.css']
})
export class TicketAddComponent implements OnInit {

  ticketForm!: FormGroup;
  governorates = Mocks.governorates;

  cities = Mocks.cities;

  districts = Mocks.districts;

  constructor(private fb: FormBuilder, private service: TicketsService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.ticketForm = this.fb.group({
      phone: [null,
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]
      ],
      governorateId: [null,
        [Validators.required]
      ],
      cityId: [null,
        [Validators.required]
      ],
      districtId: [null,
        [Validators.required]
      ],
    });
  }
  back() {
    this.router.navigateByUrl('/tickets');
  }
  onSubmit() {
    const formValue = this.ticketForm.value;

    this.service.createTicket(new Ticket(formValue.phone, formValue.governorateId, formValue.cityId, formValue.districtId))
      .subscribe((response: any) => {
        this.router.navigateByUrl('/tickets');
      });
  }
}
