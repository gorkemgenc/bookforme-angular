import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bookforme-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {

  rentals: any[] = [{
    id:1,
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
    id:1,
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
    id:1,
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
    id:1,
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

  constructor() { }

  ngOnInit() {
  }

}
