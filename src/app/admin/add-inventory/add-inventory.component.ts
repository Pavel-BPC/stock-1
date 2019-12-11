import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service'
import { StockService } from '../../services/stock.service';
import { ProductService } from '../../services/product.service';
import Product from '../../models/Product';
import Stock from '../../models/Stock';
import Inventory from '../../models/Inventory'

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {

  InventoryForm: FormGroup;
  SearchProductForm: FormGroup;

  res: {} = {};
  // res = { id: "1", product: "1", stock: "2", price: 5, quantity: 100, sum: 500 };
  inventory: {} = {};
  // products = [{ id: "1", name: "11" }, { id: "2", name: "222" }];
  // stocks = [{ id: "1", name: "11" }, { id: "2", name: "222" }];
  products: Product[];
  stocks: Stock[];

  constructor(private ss: StockService, private ps: ProductService, private fb: FormBuilder, private is: InventoryService) { }

  ngOnInit() {
    this.SearchProductForm = this.fb.group({
      product: ['', Validators.required],
      stock: ['', Validators.required],
    })

    this.ps.get_products().subscribe((data: Product[]) => {
      this.products = data;
    });

    this.ss.get_stocks().subscribe((data: Stock[]) => {
      this.stocks = data;
    });

    this.InventoryForm = this.fb.group({
      product_id: [{ value: '', disabled: true }, Validators.required],
      stock_id: [{ value: '', disabled: true }, Validators.required],
      date: ['', Validators.required],
      quantity: [{ value: '', disabled: true }, Validators.required],
      sum: [{ value: '', disabled: true }, Validators.required],
      real_sum: ['0', Validators.required],
      price: [{ value: '', disabled: true }, Validators.required],
      deficit: [{ value: '', disabled: true }, Validators.required],
      real_quantity: ['0', Validators.required],
      deficit_price: [{ value: '', disabled: true }, Validators.required],

    })
  }

  isSearch = true;

  search_product(product_id, stock_id) {
    const obj = {
      product_id: product_id,
      stock_id: stock_id,
    }
    // console.log(this.SearchProductForm);
    console.log(obj);
    // this.is.search_product(obj);
    this.isSearch = false;
    this.is.search_product(obj).subscribe(((res: Inventory[]) => {
      this.inventory = { ...res };
      this.res = res;
      console.log(res);
    }));
  }

  add_inventory(product_id, stock_id, date, quantity, sum, real_sum, real_quantity, deficit, deficit_price) {
    const inventory = {
      product_id: product_id,
      stock_id: stock_id,
      date: date,
      quantity: quantity,
      sum: sum,
      real_sum: real_sum,
      real_quantity: real_quantity,
      deficit: deficit,
      deficit_price: deficit_price
    }
    console.log(inventory);
    this.is.add_inventory(inventory);
  }
  


}