import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AppData } from './../../../../models/application-data';

import { ApplicationService } from './../../../../service/application/application.service'
import { ItemListService } from './../../../../service/item-list/item-list.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./../../../../../theme/shared-item-style.scss'],
})
export class ApplicationComponent implements OnInit {

  

  @Input() selected: AppData;
  newApp: AppData = {} as AppData;

  showPass: boolean = false;
  showCode: boolean = false;

  isUpdate = false;

  public newItem: FormGroup;
  showNewKey: boolean = false;

  constructor(private formBuider: FormBuilder, 
              private toastrService: NbToastrService,
              private dialogService: NbDialogService, 
              public navCtrl: NavController, 
              public modalCtrl: ModalController,
              private applicationService: ApplicationService,
              private itemListService: ItemListService
              ) { }

  ngOnInit() {
    this.initForms();
    this.applicationService.unlock();
  }
  
  
  private initForms() {
    this.newItem = this.formBuider.group({
      name: ['', Validators.required],
      user: ['', Validators.required],
      password: [''],
      activationCode: [''],
      version: [''],
    });
  }

  open(dialog: TemplateRef<any>, updateObject) {
    this.newItem.reset();

    if(updateObject == null) {
      this.newApp = {} as AppData;
      this.isUpdate = false;
    } else {
      this.newApp = updateObject;
      this.isUpdate = true;
    }

    this.dialogService.open(dialog);
  }

  getInputStatus(formItem: string) {
    return this.newItem.controls[formItem].dirty && this.newItem.controls[formItem].invalid ? 'danger' : 'basic';
  }

  handleItem(){

      if(!this.isUpdate) {
        this.applicationService.add(Object.assign({}, this.newApp));
      } else {
        this.applicationService.update(Object.assign({}, this.newApp));
      }

      this.itemListService.update(5);
      this.showSuccessToast(this.isUpdate? 'Item atualizado' : 'Item inserido');

  }

  removeItem(item: AppData){
    this.applicationService.delete(item.id);
    this.itemListService.update(5);
    this.showSuccessToast("Item removido!");
    this.selected = null;
  }

  
  getInputType() {
    if (this.showNewKey) {
      return 'text';
    }
    return 'password';
  }
  
  public showPassword(){
    this.showPass = !this.showPass;
  }

  public showAccCode(){
    this.showCode = !this.showCode;
  }

  canActivate(data){
    return data != null;
  }

  showSuccessToast(msg) {
    this.toastrService.show(msg,
      'Sucesso!',
      {
        status: 'success',
        position: <any> 'top-right',
        duration: <any> '3000'
      });
  }

  showErrorToast() {
    this.toastrService.show('Erro ao inserir item',
      'Erro!',
      {
        status: 'danger',
        position: <any> 'top-right',
        duration: <any> '3000'
      });
  }

}