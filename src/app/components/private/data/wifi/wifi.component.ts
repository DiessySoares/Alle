import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { WifiData } from 'src/app/models/wifi-data';
import { ItemListService } from 'src/app/service/item-list/item-list.service';
import { WifiService } from 'src/app/service/wifi/wifi.service';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./../../../../../theme/shared-item-style.scss'],
})

export class WifiComponent implements OnInit {

  public newWifi = {} as WifiData;

  @Input() selected: WifiData;

  showPasswod: boolean = false;
  showNewKey: boolean = false;
  
  public newItem: FormGroup;

  constructor(private wifiData: WifiService, private itemListService: ItemListService, private formBuider: FormBuilder, private toastrService: NbToastrService, private dialogService: NbDialogService, public navCtrl: NavController, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.initForms();
  }
  
  public showPassword(){
    this.showPasswod = !this.showPasswod;
  }
  
  private initForms() {
    this.newItem = this.formBuider.group({
      name: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
      connectionType: [''],
      authenticationMethod: [''],
    });
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  getInputStatus(formItem: string) {
    return this.newItem.controls[formItem].dirty && this.newItem.controls[formItem].invalid ? 'danger' : 'basic';
  }

  getInputType() {
    if (this.showNewKey) {
      return 'text';
    }
    return 'password';
  }

  createNewItem(){
    this.wifiData.add(this.newWifi);
    this.itemListService.update(2);
    this.showSuccessToast();
  }

  showSuccessToast() {
    this.toastrService.show('Sua conta foi criada!',
      'Sucesso!',
      {
        status: 'success',
        position: <any> 'top-right',
        duration: <any> '3000'
      });
  }

  showErrorToast() {
    this.toastrService.show('Esse nome já foi usado!',
      'Erro!',
      {
        status: 'danger',
        position: <any> 'top-right',
        duration: <any> '3000'
      });
  }

  



}
