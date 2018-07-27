import { Component, OnInit } from '@angular/core';
import {RentalService} from '../shared/rental.service';

@Component({
  selector: 'bookforme-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {

  rentals: any[] = []

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    const rentalObservable = this.rentalService.getRentals();
    rentalObservable.subscribe(
      (rentals) => {
          this.rentals = rentals;
      },
      (err) => {
        
      },
      () => {

      });
  }
}
