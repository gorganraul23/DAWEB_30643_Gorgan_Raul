import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-delete-residence',
  templateUrl: './delete-residence.component.html',
  styleUrls: ['./delete-residence.component.css']
})
export class DeleteResidenceComponent {

  id: string = ''

  constructor(private dialogRef: MatDialogRef<DeleteResidenceComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private service: ProfileService) {
    if (data.id) {
      this.id = data.id
    }
  }

  ngOnInit(): void {
  }

  deleteItem() {
    this.service.deleteResidence(this.id).subscribe(() => {
      this.dialogRef.close(true);
    })
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
