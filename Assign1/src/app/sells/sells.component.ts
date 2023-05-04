import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Locuinta, SellsService} from "./sells.service";
import {transaction_types_id, types_id} from "../app.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ToastService} from "../toast/toast.service";
import {ReservationComponent} from "../reservation/reservation.component";
import {LoginService} from "../log-in/login.service";
import {ReservationCalendarComponent} from "../reservation-calendar/reservation-calendar.component";
import {LoginPopupComponent} from "../login-popup/login-popup.component";

@Component({
  selector: 'app-sells',
  templateUrl: './sells.component.html',
  styleUrls: ['./sells.component.css']
})
export class SellsComponent {

  garsoniere_list: Locuinta[] = [];
  ap1_list: Locuinta[] = [];
  ap2_list: Locuinta[] = [];
  ap3_list: Locuinta[] = [];
  ap4_list: Locuinta[] = [];
  case_list: Locuinta[] = [];
  sp_birouri_list: Locuinta[] = [];
  sp_comerciale_list: Locuinta[] = [];

  img_url = "assets/rents/gaesoniera.jpg"
  isGarsExpanded = false;
  isAp1Expanded = false;
  isAp2Expanded = false;
  isAp3Expanded = false;
  isAp4Expanded = false;
  isCasaExpanded = false;
  isSpbirExpanded = false;
  isSpcomxpanded = false;

  constructor(private route: ActivatedRoute, private service: SellsService, private toast: ToastService, private dialog: MatDialog,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
          if (params['destination']) {
            let el = document.getElementById(params['destination'])
            this.doScroll(el!)
          }
        }
      );

    this.service.getAllByType(transaction_types_id[0], types_id[0]).subscribe(res => {
      this.garsoniere_list = res;
    })
    this.service.getAllByType(transaction_types_id[0], types_id[1]).subscribe(res => {
      this.ap1_list = res;
    })
    this.service.getAllByType(transaction_types_id[0], types_id[2]).subscribe(res => {
      this.ap2_list = res;
    })
    this.service.getAllByType(transaction_types_id[0], types_id[3]).subscribe(res => {
      this.ap3_list = res;
    })
    this.service.getAllByType(transaction_types_id[0], types_id[4]).subscribe(res => {
      this.ap4_list = res;
    })
    this.service.getAllByType(transaction_types_id[0], types_id[5]).subscribe(res => {
      this.case_list = res;
    })
    this.service.getAllByType(transaction_types_id[0], types_id[6]).subscribe(res => {
      this.sp_birouri_list = res;
    })
    this.service.getAllByType(transaction_types_id[0], types_id[7]).subscribe(res => {
      this.sp_comerciale_list = res;
    })
  }

  doScroll(el: HTMLElement) {
    setTimeout(() => {
      el.scrollIntoView({behavior: 'smooth'});
    }, 0);
  }


  openReservationDialog(event: MouseEvent, element?: Locuinta) {
    event.stopPropagation();

    if (!this.loginService.isAuthenticated()) {
      this.openNotLoggedDialog(event)
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        element
      };

      dialogConfig.width = '550px'
      dialogConfig.autoFocus = false

      const dialogRef = this.dialog.open(ReservationComponent, dialogConfig)

      dialogRef.afterClosed().subscribe(
        (status: any) => {
          if (status) {
            this.toast.showToast('Programare realizata', 'info')
          }
        }
      );
    }
  }

  isAgent() {
    return this.loginService.isAgent();
  }

  openCalendarDialog(event: MouseEvent, element?: Locuinta) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      element
    };

    dialogConfig.width = '900px'
    dialogConfig.autoFocus = false

    const dialogRef = this.dialog.open(ReservationCalendarComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      (status: any) => {
        if (status) {

        }
      }
    );
  }


  openNotLoggedDialog(event: any) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false
    const dialogRef = this.dialog.open(LoginPopupComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      status => {
        if (status) {

        }
      }
    );
  }

}
