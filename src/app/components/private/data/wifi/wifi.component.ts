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

  isUpdate = false;

  showPasswod: boolean = false;
  showNewKey: boolean = false;
  
  public newItem: FormGroup;

  constructor(private wifiService: WifiService, private itemListService: ItemListService, private formBuider: FormBuilder, private toastrService: NbToastrService, private dialogService: NbDialogService, public navCtrl: NavController, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.initForms();
  }
  
  public showPassword(){
    this.showPasswod = !this.showPasswod;
  }
  
  private initForms() {
    this.newItem = this.formBuider.group({
      name: ['', Validators.required],
      user: [''],
      password: ['', Validators.required],
      connectionType: [''],
      authenticationMethod: [''],
    });
  }

  open(dialog: TemplateRef<any>, updateObject) {
    this.newItem.reset();

    if (updateObject == null) {
      this.newWifi = {} as WifiData;
      this.isUpdate = false;
    } else {
      this.newWifi = updateObject;
      this.isUpdate = true;
    }

    this.dialogService.open(dialog);
  }


  removeItem(item: WifiData) {
    this.wifiService.delete(item.id);
    this.itemListService.update(1);
    this.showSuccessToast("Item removido!");
    this.selected = null;
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

  
  handleItem() {
    if (!this.isUpdate) {
      this.wifiService.add(Object.assign({}, this.newWifi));
    } else {
      this.wifiService.update(Object.assign({}, this.newWifi));
    }

    this.itemListService.update(1);
    this.showSuccessToast(this.isUpdate ? 'Item atualizado' : 'Item inserido');
  }

  showSuccessToast(msg) {
    this.toastrService.show(msg,
      'Sucesso!',
      {
        status: 'success',
        position: <any>'top-right',
        duration: <any>'3000'
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
