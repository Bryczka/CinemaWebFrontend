import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


declare var paypal;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
@ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  constructor() { }

currency = 'USD';
product = {
  price: 777.77,
  description: 'description_sample'
};

paidFor = false;

  ngOnInit() {
    paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amout: {
              currency_code: this.currency,
              value: this.product.price
            }
          }]
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        this.paidFor = true;
        console.log(order);
      },
      onError: err => {
        console.log(err);
      }
    })
    .render(this.paypalElement.nativeElement);
  }

}
