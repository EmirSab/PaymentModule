import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { IAddress } from 'src/app/shared/models/address';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
 // 19.234 Add formGroup -> checkout-address.component.html
 @Input() checkoutForm: FormGroup;
 constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  //#region 19.243 Updating user address -> basket.service.ts
  saveUserAddress() {
    this.accountService.updateUserAddress(this.checkoutForm.get('addressForm').value)
      .subscribe((address: IAddress) => {
        this.toastr.success('Address saved');
        // 21.274.3 Reseting the form so it goes into prestine 
        // condition in order to disable constant saving when there is no changes -> stepper.html
        this.checkoutForm.get('addressForm').reset(address);
      }, error => {
        this.toastr.error(error.message);
        console.log(error);
      });
  }
  //#endregion
}
