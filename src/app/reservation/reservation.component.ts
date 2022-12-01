import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddReservationComponent } from '../add-reservation/add-reservation.component';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'phone', 'action'];

  data: any[] = [
    {
      doa: new Date('11/01/2021'),
      dod: new Date('11/04/2021'),
      room_size: 1,
      room_quantity: 2,
      first_name: 'IDM',
      last_name: 'ENG',
      email: 'idm.test@idm.com',
      phone: '9999999999',
      street_name: 'IDM',
      street_number: '1234',
      zip: '123456',
      state: 'Arizona',
      city: 'OAK',
      extras: 1,
      payment: 'cash',
      tags: ['hotel', 'booking'],
      isReminder: true,
      isSubscribeNewsletter: false,
      isConfirm: true,
    },
    {
      doa: new Date('11/01/2021'),
      dod: new Date('11/04/2021'),
      room_size: 1,
      room_quantity: 2,
      first_name: 'IDM',
      last_name: 'PM',
      email: 'idm.op@idm.com',
      phone: '123456789',
      street_name: 'IDM',
      street_number: '1234',
      zip: '123456',
      state: 'Arizona',
      city: 'OAK',
      extras: 1,
      payment: 'cash',
      tags: ['hotel', 'booking'],
      isReminder: true,
      isSubscribeNewsletter: true,
      isConfirm: false,
    },
  ];

  dataSource: any = [];

  search_text: string = "";

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = this.data;
  }

  onSearch() {
    if (this.search_text == '') {
      this.dataSource = this.data;
    } else {
      let text = this.search_text.toLowerCase();
      this.dataSource = this.data.filter(val => {
        return (val.first_name.toLowerCase().search(text) > -1 ||
          val.last_name.toLowerCase().search(text) > -1 ||
          val.phone.toLowerCase().search(text) > -1 ||
          val.email.toLowerCase().search(text) > -1)
      });
    }
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddReservationComponent, {
      data: { data: null, mode: 'add' }, width: '100%'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataSource.push(result);
        this.data = this.dataSource;
        this.dataSource = this.dataSource.filter((val: any) => { return val });
      }
    });
  }

  onEdit(data: any, mode: string, i: number = 0) {
    const dialogRef = this.dialog.open(AddReservationComponent, {
      data: { data: data, mode: mode }, width: '100%'
    });
    if (mode == 'edit') {
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.dataSource[i] = result;
          this.data = this.dataSource;
          this.dataSource = this.dataSource.filter((val: any) => { return val });
        }
      });
    }
  }

  onDelete(data: any) {
    this.dataSource = this.dataSource.filter((val: any) => {
      return (val != data)
    });
    this.data = this.dataSource;
  }
}
