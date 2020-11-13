import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingService } from 'src/app/services/setting.service';


@Component({
  selector: 'app-setting-address',
  templateUrl: './setting-address.component.html',
  styleUrls: ['./setting-address.component.css']
})
export class SettingAddressComponent implements OnInit {

  settingAddressForm: FormGroup;
  settingId;

  settingAddress: any[];
  addressItem = { address: '', positionHeight: '', positionWidth: '' };
  constructor(
    private seService: SettingService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.initForm();

    this.seService.getAll().subscribe((setting) => {
      this.settingId = setting[0]._id;
    
      this.settingAddress = setting[0].addresses;
    });


  }

  emptyForm(){
    this.settingAddressForm.reset();
  }

  removeSettingAddress(addressId) {


    this.seService.deleteSettingAddress(addressId).subscribe((result) => {
      const setting = result['body'];


      if (setting) {
        this.settingAddress = setting['result'].addresses;


      }
    });

  }
  onNavigate() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onSubmit() {
    this.addressItem.address = this.settingAddressForm.get('address').value;
    this.addressItem.positionHeight = this.settingAddressForm.get('positionHeight').value;
    this.addressItem.positionWidth = this.settingAddressForm.get('positionWidth').value;


    this.seService.addSettingAddress(this.settingId, this.addressItem).subscribe((result) => {
      if (result) {
        const setting = result['body'];


        if (setting) {
          this.settingAddress =  setting['result'].addresses;
          this.emptyForm();
        }
      }
    });

  }
  private initForm() {

    this.settingAddressForm = new FormGroup({
      address: new FormControl('', Validators.required),
      positionWidth: new FormControl(''),
      positionHeight: new FormControl('')
    });
  }

}
