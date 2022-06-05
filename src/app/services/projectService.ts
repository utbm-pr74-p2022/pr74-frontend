import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Project } from './project';

@Injectable()
export class ProjectService {

    status: string[] = ['CLOSE', 'OPEN', 'PROGRESS'];

    projectTitles: string[] = [
        "Bamboo Watch",
        "Black Watch",
        "Blue Band",
        "Blue T-Shirt",
        "Bracelet",
        "Brown Purse",
        "Chakra Bracelet",
        "Galaxy Earrings",
        "Game Controller",
        "Gaming Set",
        "Gold Phone Case",
        "Green Earbuds",
        "Green T-Shirt",
        "Grey T-Shirt",
        "Headphones",
        "Light Green T-Shirt",
        "Lime Band",
        "Mini Speakers",
        "Painted Phone Case",
        "Pink Band",
        "Pink Purse",
        "Purple Band",
        "Purple Gemstone Necklace",
        "Purple T-Shirt",
        "Shoes",
        "Sneakers",
        "Teal T-Shirt",
        "Yellow Earbuds",
        "Yoga Mat",
        "Yoga Set",
    ];

    constructor(private http: HttpClient) { }

    // getProductsSmall() {
    //     return this.http.get<any>('assets/products-small.json')
    //     .toPromise()
    //     .then(res => <Product[]>res.data)
    //     .then(data => { return data; });
    // }

    // getProducts() {
    //     return this.http.get<any>('assets/products.json')
    //     .toPromise()
    //     .then(res => <Product[]>res.data)
    //     .then(data => { return data; });
    // }

    // getProductsWithOrdersSmall() {
    //     return this.http.get<any>('assets/products-orders-small.json')
    //     .toPromise()
    //     .then(res => <Product[]>res.data)
    //     .then(data => { return data; });
    // }

    generateProject(): Project {
      const project: Project =  {
          id: this.generateId(),
          projectNo: "PRO00001",
          title: this.generateTitle(),
          createdDate: new Date(),
          status: this.generateStatus()
      };

      return project;
  }

    generateId() {
      return Math.floor(Math.random() * Math.floor(299)+1);
    }

    generateTitle() {
        return this.projectTitles[Math.floor(Math.random() * Math.floor(30))];
    }

    generateStatus() {
        return this.status[Math.floor(Math.random() * Math.floor(3))];
    }
}
