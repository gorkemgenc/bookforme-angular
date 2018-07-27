import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';
@Injectable()
export class RentalService{
    
    private rentals: Rental[] = [{
        id:"1",
        title:"Central Apartment1",
        city: "New York",
        street: "Times Square",
        category: "Apartment",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        description: "Very nice apartment",
        dailyRate: 31,
        shared: false,
        createdAt: "24/12/2017"
      },{
        id: "2",
        title:"Central Apartment2",
        city: "Istanbul",
        street: "Times Square",
        category: "condo",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 2,
        description: "Very nice apartment",
        dailyRate: 12,
        shared: true,
        createdAt: "24/12/2017"
      },{
        id: "3",
        title:"Central Apartment3",
        city: "Washington",
        street: "Times Square",
        category: "condo",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        description: "Very nice apartment",
        dailyRate: 33,
        shared: false,
        createdAt: "24/12/2017"
      },{
        id: "4",
        title:"Central Apartment4",
        city: "Belgium",
        street: "Haupt strasse",
        category: "house",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        description: "Very nice apartment",
        dailyRate: 34,
        shared: false,
        createdAt: "24/12/2017"
      }];

      public getRentals(): Observable<Rental[]> {
        const rentalObservable: Observable<Rental[]> = new Observable((observer) => {
            setTimeout(() => {
                observer.next(this.rentals);
            }, 1000);

            setTimeout(() => {
                observer.error('I AM ERROR');
            }, 1000);

            setTimeout(() => {
                observer.complete();
            }, 3000);
        });
        return rentalObservable; 
      }
}