import {Component, Inject, ViewChild} from '@angular/core';
import {Reservation, ReservationRequest, ReservationService} from "../reservation/reservation.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastService} from "../toast/toast.service";
import {Locuinta} from "../sells/sells.service";
import {transaction_types_id, types_id} from "../app.component";
import {DatePipe} from '@angular/common';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartOptions} from 'chart.js';

@Component({
  selector: 'app-reservation-calendar',
  templateUrl: './reservation-calendar.component.html',
  styleUrls: ['./reservation-calendar.component.css']
})
export class ReservationCalendarComponent {

  @ViewChild('baseChart') chart?: BaseChartDirective;
  days: number[] = [];
  values: number[] = [];

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
  reservations: ReservationRequest[] = [];
  month_reservations: ReservationRequest[] = [];
  public selectedDate: Date = new Date();
  request: ReservationRequest = {user_id: 0, locuinta_id: 0, date_time: this.selectedDate}

  constructor(private service: ReservationService,
              private dialogRef: MatDialogRef<ReservationCalendarComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private toast: ToastService,
              private datePipe: DatePipe) {

    this.locuinta.id = data.element.id;
    this.request.locuinta_id = data.element.id;
  }

  ngOnInit() {
    this.generateNumbers(31);
    const date = new Date(this.selectedDate);
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ssZZZZZ');
    const request: Reservation = {date_time: formattedDate!!, locuinta_id: this.locuinta.id, user_id: 0}
    this.service.getReservationsPerMonth(request).subscribe(res => {
      this.month_reservations = res;
      console.log(res);
      this.mapValues();
    });

    //this.mapValues();
  }

  public onDateSelected(args: any) {
    this.selectedDate = args

    const date = new Date(this.selectedDate);
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ssZZZZZ');

    const request: Reservation = {date_time: formattedDate!!, locuinta_id: this.locuinta.id, user_id: 0}
    this.service.getActiveReservationPerDay(request).subscribe(res => {
      this.reservations = res;
      console.log(res);
    });

  }

  convertDate(data: Date): string {
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(data, 'yyyy-MM-dd HH:mm');
    return formattedDate!!;
  }

  generateNumbers(nrDays: number) {
    for (let i = 1; i <= nrDays; i++) {
      this.days.push(i);
      this.values.push(0);
    }
  }

  title = 'Consumption graphic';
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.days,
    datasets: [
      {
        data: this.values.slice(1, 31),
        label: 'Rezervari',
        fill: true,
        tension: 0.0,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    scales: {
      y: {
        title: {
          display: true,
          text: 'rezervari'
        }
      },
      x: {
        title: {
          display: true,
          text: 'zi'
        }
      }
    }
  };
  public lineChartLegend = true;

  mapValues(){
    console.log(this.month_reservations);
    console.log(this.values);
    for(let item of this.month_reservations){
      const date = new Date(item.date_time);
      console.log(date);
      const day = date.getDate();
      console.log(day);
      this.values[day] += 1;
    }

    console.log(this.values);
    this.lineChartData.datasets[0].data = this.values.slice(1,31);
    this.chart?.update();
  }

}
