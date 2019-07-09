import { Component, OnInit } from '@angular/core';
import {product} from '../model/product';
import {ProductService} from '../services/product.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
 _product:product;
 productArr = [];

  constructor(private prdService:ProductService) {
    this._product= new product ();
   }
   //Save product
   saveData(){
    this.prdService.saveProduct(this._product).subscribe(data =>{
      this.getProductData();
    })  
   }
    //Update product
   updateData(){
     this.prdService.updateProduct(this._product).subscribe(data =>{
      console.log(data);
      this.getProductData();
     })
   }
    //Edit product
   editProduct(obj){
      this._product._id = obj._id;
      this._product.productName = obj.productName;
      this._product.productCountry = obj.productCountry;
      
    }
 //Delete product
deleteProduct(_id){
this.prdService.delProduct(_id).subscribe(data =>{
  this.getProductData();
  console.log(''+ data);
})
 }
 //Get product
   getProductData(){
      this.prdService.getProduct().subscribe(data =>{
        this.productArr = data;
      })
  }
  ngOnInit() {
    this.getProductData();
  }
}
