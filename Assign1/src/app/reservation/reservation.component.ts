import {Component, Inject} from '@angular/core';
import {Locuinta} from "../sells/sells.service";
import {trans_types_label, transaction_types_id, types_id, types_label} from "../app.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastService} from "../toast/toast.service";
import {ReservationRequest, ReservationService} from "./reservation.service";
import {idGetter} from "../app.module";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {

  title: string = 'Programare vizita';
  okToSave: boolean = false;

  locuinta: Locuinta = {
    id: 0,
    transaction_type: transaction_types_id[0],
    type: types_id[0],
    description: '',
    square_meters: 0,
    floor: '',
    rooms: '',
    city: '',
    zone: '',
    price: 0,
    date_added: null,
    img_path: '',
    user_id: ''
  }

  public selectedDate: Date = new Date();
  minDate: Date = new Date(Date.now())
  message = ""

  request: ReservationRequest = {user_id: 0, locuinta_id: 0, date_time: this.selectedDate}

  constructor(private service: ReservationService,
              private dialogRef: MatDialogRef<ReservationComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private toast: ToastService) {

    this.locuinta.id = data.element.id;
    this.locuinta.transaction_type = data.element.transaction_type;
    this.locuinta.type = data.element.type;
    this.locuinta.description = data.element.description;
    this.locuinta.square_meters = data.element.square_meters;
    this.locuinta.floor = data.element.floor;
    this.locuinta.rooms = data.element.rooms;
    this.locuinta.city = data.element.city;
    this.locuinta.zone = data.element.zone;
    this.locuinta.price = data.element.price;

    const now = new Date();
    const nextHour = now.getHours() + 1;
    this.minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), nextHour, 0, 0);
    this.selectedDate = this.minDate;
  }

  ngOnInit(): void {
    //console.log(this.selectedDate);
  }

  readonly trasactionTypes = transaction_types_id;
  readonly transactionTypesLabels = trans_types_label;
  readonly types = types_id;
  readonly typesLabels = types_label;

  save() {
    this.request.locuinta_id = this.locuinta.id;
    this.request.user_id = Number.parseInt(idGetter());
    this.request.date_time = this.selectedDate;

    this.service.makeReservation(this.request).subscribe(res => {
      this.dialogRef.close(true);
    });
  }

  public onDateSelected(args: any) {
    this.selectedDate = args;
    const request: ReservationRequest = {user_id: 0, locuinta_id: this.locuinta.id, date_time: this.selectedDate}
    this.service.verifyAvailableReservation(request).subscribe(res => {
      if (res.length != 0) {
        const actual_date = new Date(request.date_time);
        console.log(actual_date);
        actual_date.setMinutes(actual_date.getMinutes() + 30);

        const datePipe = new DatePipe('en-US');
        const formattedDate = datePipe.transform(actual_date, 'dd-MM HH:mm');
        console.log(formattedDate)
        this.message = "Data indisponibila! Incearca: \n" + formattedDate;
        this.okToSave = false;
      }
      else {
        this.message = ""
        this.okToSave = true;
      }
    });
  }

}
