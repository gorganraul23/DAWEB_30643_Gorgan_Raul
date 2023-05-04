import {Component, Inject} from '@angular/core';
import {trans_types_label, transaction_types_id, types_id, types_label} from "../../app.component";
import {FormControl, FormGroup} from "@angular/forms";
import {ProfileService} from "../profile.service";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastService} from "../../toast/toast.service";
import {Locuinta} from "../../sells/sells.service";

@Component({
  selector: 'app-edit-residence',
  templateUrl: './edit-residence.component.html',
  styleUrls: ['./edit-residence.component.css']
})
export class EditResidenceComponent {

  edit?: boolean;
  title: string = 'Modifica anuntul';
  message?: null | string;
  okToSave?: boolean;
  id: string = '';

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

  constructor(private service: ProfileService,
              private dialogRef: MatDialogRef<EditResidenceComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private toast: ToastService) {

    console.log(data);
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
    this.locuinta.date_added = data.element.date_added;
    this.locuinta.img_path = data.element.img_path;
    this.locuinta.user_id = data.element.user_id;

    this.form.patchValue(data.element);
    console.log(this.locuinta)
  }

  ngOnInit(): void {
  }

  readonly trasactionTypes = transaction_types_id;
  readonly transactionTypesLabels = trans_types_label;

  form = new FormGroup({
    transaction_type: new FormControl(1),
    description: new FormControl(''),
    square_meters: new FormControl(0),
    floor: new FormControl(''),
    rooms: new FormControl(''),
    city: new FormControl(''),
    zone: new FormControl(''),
    price: new FormControl(0),
  })

  save() {

    this.locuinta.transaction_type = this.transTypeControl.value!,
      this.locuinta.description = this.descriptionControl.value!,
      this.locuinta.square_meters = this.squareMetersControl.value!,
      this.locuinta.floor = this.floorControl.value!,
      this.locuinta.rooms = this.roomsControl.value!,
      this.locuinta.city = this.cityControl.value!,
      this.locuinta.zone = this.zoneControl.value!,
      this.locuinta.price = this.priceControl.value!,

    //if (this.edit) {
    this.service.updateResidence(this.locuinta).subscribe(res => {
      this.dialogRef.close(true);
      this.toast.showToast('Anunt modificat', 'info')
    })
    // }
  }

  get transTypeControl() {
    return this.form.controls['transaction_type'];
  }

  get descriptionControl() {
    return this.form.controls['description'];
  }

  get squareMetersControl() {
    return this.form.controls['square_meters'];
  }

  get floorControl() {
    return this.form.controls['floor'];
  }

  get roomsControl() {
    return this.form.controls['rooms'];
  }

  get cityControl() {
    return this.form.controls['city'];
  }

  get zoneControl() {
    return this.form.controls['zone'];
  }

  get priceControl() {
    return this.form.controls['price'];
  }

}
