import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrderService } from '../../services/order.service';
import Order from '../../models/Order'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  orders: Order[];
  modalRef: BsModalRef;
  OrderForm: FormGroup;
  res: {} = {};
  order: {} = {};

  constructor(private os: OrderService, private route: ActivatedRoute, private fb: FormBuilder, private modalService: BsModalService) {
    this.createForm();
  }

  createForm() {
    this.OrderForm = this.fb.group({
      date: [{ value: '', disabled: true }, Validators.required],
      product_id: [{ value: '', disabled: true }, Validators.required],
      partner_id: [{ value: '', disabled: true }, Validators.required],
      quantity: [{ value: '', disabled: true }, , Validators.required],
      sum: [{ value: '', disabled: true }, , Validators.required],
      paid_sum: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.os.get_orders().subscribe((data: Order[]) => {
      this.orders = data;
      console.log('orders');
      console.log(this.orders);
    })
  }

  delete_order(id) {
    this.os.delete_order(id).subscribe(res => {
      console.log(id);
      console.log('Order deleted')
    })
  }

  save(date, product_id, partner_id, quantity, sum, paid_sum, id) {
    
    const order = {
      date: date,
      product_id: product_id,
      partner_id: partner_id,
      quantity: quantity,
      sum: sum,
      paid_sum: paid_sum,
    }

    this.route.params.subscribe(params => {
      this.os.update_order(order, id);
      this.modalRef.hide();
    });
  }

  open_modal(template: TemplateRef<any>, id) {
    this.modalRef = this.modalService.show(template);
    console.log(id);
    this.os.edit_order(id).subscribe(((res: Order[]) => {
      this.order = { ...res };
      this.res = res;
      console.log(res);
    }));
  }

}