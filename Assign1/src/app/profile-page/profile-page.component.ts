import {Component} from '@angular/core';
import {Locuinta} from "../sells/sells.service";
import {trans_types_label, transaction_types_id, types_id, types_label} from "../app.component";
import {FormControl, FormGroup} from "@angular/forms";
import {ProfileService, Location} from "./profile.service";
import {idGetter, tokenGetter} from "../app.module";
import {LoginService} from "../log-in/login.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditResidenceComponent} from "./edit-residence/edit-residence.component";
import {DeleteResidenceComponent} from "./delete-residence/delete-residence.component";
import {ToastService} from "../toast/toast.service";
import {HttpClient} from "@angular/common/http";

export interface User {
  name: string,
  email: string,
  preferences: number[]
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  constructor(private service: ProfileService, private auth_service: LoginService, private router: Router, private dialog: MatDialog,
              private toast: ToastService, private http: HttpClient) {
  }

  api_key = 'bec5fc293eeb4cd2a4df48f0f498b61f';
  locationUrl = 'https://ipgeolocation.abstractapi.com/v1/?api_key=' + this.api_key;
  location: Location = {city: '', region: '', country: '', ip: ''}

  ngOnInit(): void {
    if (tokenGetter()) {
      const id = idGetter();
      this.service.getUserById(id).subscribe(res => {
        this.user.name = res.name;
        this.user.email = res.email;
        this.user.preferences = res.preferences;
        this.modifiedUser.name = res.name;
        this.modifiedUser.email = res.email;
        this.modifiedUser.preferences = res.preferences;
        console.log(res.name, res.email, res.preferences);
      })
    } else {
      // this.onClickLogout();
      // this.router.navigate(['home'])
    }
    this.getGeolocationData();
  }

  user: User = {name: '', email: '', preferences: []}
  modifiedUser: User = {name: '', email: '', preferences: []}

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

  url: any;
  msg = "";

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }
    const mimeType = event.target.files[0].type;
    console.log(event.target.files[0].name)
    this.locuinta.img_path = "assets/locuinte/" + event.target.files[0].name;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }
  }

  my_offers: Locuinta[] = [];
  my_favorites: Locuinta[] = [];
  offers: Locuinta[] = [];

  form = new FormGroup({
    transaction_type: new FormControl(1),
    type: new FormControl(1),
    description: new FormControl(''),
    square_meters: new FormControl(0),
    floor: new FormControl(''),
    rooms: new FormControl({value: '', disabled: true}),
    city: new FormControl(''),
    zone: new FormControl(''),
    price: new FormControl(0),
  })

  form1 = new FormGroup({
    type: new FormControl(1),
  })
  form2 = new FormGroup({
    type: new FormControl(1),
  })

  readonly trasactionTypes = transaction_types_id;
  readonly transactionTypesLabels = trans_types_label;

  readonly types = types_id;
  readonly typesLabels = types_label;

  preferenceSelected: number = -1;

  isFormComplete = false

  editing = false;
  isMyProfileSelected = true;
  isMyOffersSelected = false;
  isFavoriteSelected = false;
  isAddOfferSelected = false;
  isModifyOfferSelected = false;

  updateDisabledFields(event: any) {
    console.log(this.form.controls['type'].value);
    if (this.form.controls['type'].value! in [1, 2, 3, 4, 5]) {
      this.form.controls['rooms'].disable()
      this.form.controls['floor'].enable()
    } else {
      this.form.controls['rooms'].enable()
      this.form.controls['floor'].disable()
    }
  }

  getInitials = (name: string | undefined) => {
    return name?.split(" ").map((n) => n[0]).join("");
  }

  onClickEdit() {
    this.editing = true;
  }

  onClickSave() {
    if(this.preferenceSelected != -1)
      this.modifiedUser.preferences.push(this.preferenceSelected)
    this.service.updateUser(idGetter(), this.modifiedUser.name, this.modifiedUser.email, this.modifiedUser.preferences).subscribe(res => {
      this.user.name = res.name;
      this.user.email = res.email;
      this.user.preferences = res.preferences;
    })
    this.toast.showToast('Informatii actualizate', 'info')
    this.editing = false;
    this.preferenceSelected = -1;
  }

  onClickAnuleaza(){
    this.editing = false;
    this.modifiedUser.name = this.user.name;
    this.modifiedUser.email = this.user.email;
    this.modifiedUser.preferences = this.user.preferences
    this.preferenceSelected = -1;
  }

  onClickDeletePrefered(value: number){
    this.modifiedUser.preferences.splice(value, 1);
    this.service.updateUser(idGetter(), this.user.name, this.user.email, this.modifiedUser.preferences).subscribe(res => {
      this.user.name = res.name;
      this.user.email = res.email;
      this.user.preferences = res.preferences;
    })
    this.toast.showToast('Preferinte actualizate', 'info')
  }

  onClickLogout() {
    this.auth_service.logout();
    this.router.navigate(['home'])
  }

  onClickMyProfile() {
    this.isMyProfileSelected = true;
    this.isMyOffersSelected = false;
    this.isFavoriteSelected = false;
    this.isAddOfferSelected = false;
    this.isModifyOfferSelected = false;
  }

  onClickMyOffers() {
    this.isMyProfileSelected = false;
    this.isMyOffersSelected = true;
    this.isFavoriteSelected = false;
    this.isAddOfferSelected = false;
    this.isModifyOfferSelected = false;
    this.service.getOffersByUser(idGetter(), this.form2.controls.type.value!).subscribe(res => {
      this.my_offers = res;
    })
  }

  onClickFavorites() {
    this.isMyProfileSelected = false;
    this.isMyOffersSelected = false;
    this.isFavoriteSelected = true;
    this.isAddOfferSelected = false;
    this.isModifyOfferSelected = false;
    this.service.getFavoritesByUser(idGetter()).subscribe(res => {
      this.my_favorites = res;
    })
  }

  onClickAddOffer() {
    this.isMyProfileSelected = false;
    this.isMyOffersSelected = false;
    this.isFavoriteSelected = false;
    this.isAddOfferSelected = true;
    this.isModifyOfferSelected = false;
  }

  onClickModifyOffer() {
    this.isMyProfileSelected = false;
    this.isMyOffersSelected = false;
    this.isFavoriteSelected = false;
    this.isAddOfferSelected = false;
    this.isModifyOfferSelected = true;
    this.service.getAllByTypeOfResidence(this.form1.controls.type.value!).subscribe(res => {
      this.offers = res;
    })
  }


  onClickAddOfferBtn() {
    this.locuinta.transaction_type = this.form.controls['transaction_type'].value!
    this.locuinta.type = this.form.controls['type'].value!
    this.locuinta.description = this.form.controls['description'].value!
    this.locuinta.square_meters = this.form.controls['square_meters'].value!
    this.locuinta.floor = this.form.controls['floor'].value!
    this.locuinta.rooms = this.form.controls['rooms'].value!
    this.locuinta.city = this.form.controls['city'].value!
    this.locuinta.zone = this.form.controls['zone'].value!
    this.locuinta.price = this.form.controls['price'].value!
    this.locuinta.user_id = idGetter();

    this.service.addOffer(this.locuinta).subscribe(res => {
      this.onClickMyOffers()
    })
    this.service.getOffersByUser(idGetter(), this.form2.controls.type.value!).subscribe(res => {
      this.my_offers = res;
    })
    this.toast.showToast('Locuinta adaugata', 'info')
  }

  completeForm() {
    this.isFormComplete = this.locuinta.city != '';
  }

  isAgent() {
    return this.auth_service.isAgent();
  }

  openEditDialog(event: MouseEvent, element?: Locuinta) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      element
    };

    dialogConfig.width = '550px'
    dialogConfig.autoFocus = false

    const dialogRef = this.dialog.open(EditResidenceComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      (status: any) => {
        if (status) {
          if (this.isModifyOfferSelected) {
            this.service.getAllByTypeOfResidence(this.form1.controls.type.value!).subscribe(res => {
              this.offers = res;
            })
          } else if (this.isMyOffersSelected) {
            this.service.getOffersByUser(idGetter(), this.form2.controls.type.value!).subscribe(res => {
              this.my_offers = res;
            })
          }
          this.toast.showToast('Locuinta actualizata', 'info')
        }
      }
    );
  }


  openDeleteDeviceDialog(event: any, id: number) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id
    };

    dialogConfig.autoFocus = false

    const dialogRef = this.dialog.open(DeleteResidenceComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      status => {
        if (status) {
          this.service.getOffersByUser(idGetter(), this.form2.controls.type.value!).subscribe(res => {
            this.my_offers = res;
          })
          this.service.getAllByTypeOfResidence(this.form1.controls.type.value!).subscribe(res => {
            this.offers = res;
          })
          this.toast.showToast('Locuinta stearsa', 'info')
        }
      }
    );
  }

  filterByType(event: any){
    console.log(this.form1.controls.type.value);
    this.service.getAllByTypeOfResidence(this.form1.controls.type.value!).subscribe(res => {
      this.offers = res;
    })
  }

  filterMyOffers(event: any){
    console.log(this.form2.controls.type.value);
    this.service.getOffersByUser(idGetter(), this.form2.controls.type.value!).subscribe(res => {
      this.my_offers = res;
    })
  }

  getGeolocationData() {
    this.http.get(this.locationUrl).subscribe((res:any) =>{
      var data = JSON.stringify(res);
      this.location.city = res.city;
      this.location.region = res.region;
      this.location.country = res.country;
      this.location.ip = res.ip_address;
      sessionStorage.setItem('location', JSON.stringify(this.location))
    });
  }

}
