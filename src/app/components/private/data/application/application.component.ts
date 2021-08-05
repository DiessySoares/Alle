import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AppData } from 'src/app/models/application-data';

import { ApplicationService } from './../../../../service/application/application.service'
import { ItemListService } from 'src/app/service/item-list/item-list.service';

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

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  getInputStatus(formItem: string) {
    return this.newItem.controls[formItem].dirty && this.newItem.controls[formItem].invalid ? 'danger' : 'basic';
  }

  createNewItem(){
    this.applicationService.add(this.newApp);
    this.itemListService.update(5);
    this.showSuccessToast();
  }

  showSuccessToast() {
    this.toastrService.show('Item adicionado!',
      'Sucesso!',
      {
        status: 'success',
        position: <any> 'top-right',
        duration: <any> '3000'
      });
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

}