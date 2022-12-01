import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {
  @ViewChild('tagsInput') tagsInput: any;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  tags: string[] = [];
  filteredTags: Observable<string[]>;
  allTags: string[] = ['hotel', 'booking', 'labtest'];


  constructor(public dialogRef: MatDialogRef<AddReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allTags.slice())),
    );
  }

  formGroup: FormGroup = new FormGroup({
    doa: new FormControl(new Date(), []),
    dod: new FormControl(new Date(), []),
    room_size: new FormControl(0, []),
    room_quantity: new FormControl(0, [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    street_name: new FormControl('', []),
    street_number: new FormControl('', []),
    zip: new FormControl('', [Validators.required]),
    state: new FormControl('', []),
    city: new FormControl('', [Validators.required]),
    extras: new FormControl(0, []),
    payment: new FormControl('', [Validators.required]),
    tags: new FormControl([], []),
    isReminder: new FormControl(false, []),
    isSubscribeNewsletter: new FormControl(false, []),
    isConfirm: new FormControl(false, []),
  });

  mode: string = 'add';
  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.mode = this.data.mode;

      if (this.mode == 'edit' || this.mode == 'view') {
        var data = this.data.data;
        this.tags = data.tags;
        this.formGroup.patchValue({
          doa: new Date(data.doa),
          dod: new Date(data.dod),
          room_size: data.room_size,
          room_quantity: data.room_quantity,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          street_name: data.street_name,
          street_number: data.street_number,
          zip: data.zip,
          state: data.state,
          city: data.city,
          extras: data.extras,
          payment: data.payment,
          tags: data.tags,
          isReminder: data.isReminder,
          isSubscribeNewsletter: data.isSubscribeNewsletter,
          isConfirm: data.isConfirm,
        });
      }

      if (this.mode == 'view') {
        this.formGroup.controls['doa'].disable();
        this.formGroup.controls['dod'].disable();
        this.formGroup.controls['room_size'].disable();
        this.formGroup.controls['room_quantity'].disable();
        this.formGroup.controls['first_name'].disable();
        this.formGroup.controls['last_name'].disable();
        this.formGroup.controls['email'].disable();
        this.formGroup.controls['phone'].disable();
        this.formGroup.controls['street_name'].disable();
        this.formGroup.controls['street_number'].disable();
        this.formGroup.controls['zip'].disable();
        this.formGroup.controls['state'].disable();
        this.formGroup.controls['city'].disable();
        this.formGroup.controls['extras'].disable();
        this.formGroup.controls['payment'].disable();
        this.formGroup.controls['tags'].disable();
        this.formGroup.controls['isReminder'].disable();
        this.formGroup.controls['isSubscribeNewsletter'].disable();
        this.formGroup.controls['isConfirm'].disable();
      }
    }
  }

  get payment() { return this.formGroup.get('payment'); }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.formGroup.patchValue({ tags: this.tags });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagsInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    this.formGroup.patchValue({ tags: this.tags });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}
