import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { CreditCardData } from './../../../../models/credit-card-data';
import { ApplicationService } from './../../../../service/application/application.service';
import { CreditService } from './../../../../service/credit/credit.service';
import { ItemListService } from './../../../../service/item-list/item-list.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./../../../../../theme/shared-item-style.scss'],
})
export class CreditComponent implements OnInit {

  @Input() selected: CreditCardData;

  newCredit: CreditCardData = {} as CreditCardData;

  showPass: boolean = false;
  showCode: boolean = false;

  public newItem: FormGroup;

  isUpdate = false;

  constructor(private formBuider: FormBuilder, 
    private toastrService: NbToastrService, 
    private dialogService: NbDialogService,
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    private creditService : CreditService,
    private itemListService: ItemListService) { }

  ngOnInit() {
    this.initForms();
  }
  

  public showCVV(){
    this.showCode = !this.showCode;
  }

  public resolveType(type: number): string{
    return "Debito";
  }

  showNewPass: boolean = false;
  showNewCode: boolean = false; 

  public showPassword(){
    this.showPass = !this.showPass;
  }

  private initForms() {
    this.newItem = this.formBuider.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      cardType: ['', Validators.required],
      expiration: ['', Validators.required],
      password: ['', Validators.required],
      securityNumber: ['', Validators.required],
    });
  }

  open(dialog: TemplateRef<any>, updateObject) {
    this.newItem.reset();

    if(updateObject == null) {
      this.newCredit = {} as CreditCardData;
      this.isUpdate = false;
    } else {
      this.newCredit = updateObject;
      this.isUpdate = true;
    }

    this.dialogService.open(dialog);
  }

  removeItem(item: CreditCardData){
    this.creditService.delete(item.id);
    this.itemListService.update(3);
    this.showSuccessToast("Item removido!");
    this.selected = null;
  }

  getInputStatus(formItem: string) {
    return this.newItem.controls[formItem].dirty && this.newItem.controls[formItem].invalid ? 'danger' : 'basic';
  }

  getInputPassType() {
    if (this.showNewPass) {
      return 'text';
    }
    return 'password';
  }

  getInputCodeType() {
    if (this.showNewCode) {
      return 'text';
    }
    return 'password';
  }

  handleItem(){
    if(!this.isUpdate) {
      this.creditService.add(Object.assign({}, this.newCredit));
    } else {
      this.creditService.update(Object.assign({}, this.newCredit));
    }

    this.itemListService.update(3);
    this.showSuccessToast(this.isUpdate? 'Item atualizado' : 'Item inserido');
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
    this.toastrService.show('Esse nome já foi usado!',
      'Erro!',
      {
        status: 'danger',
        position: <any> 'top-right',
        duration: <any> '3000'
      });
  }

}
