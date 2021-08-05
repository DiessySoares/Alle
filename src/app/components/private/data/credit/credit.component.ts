import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { CreditCardData } from 'src/app/models/credit-card-data';
import { ApplicationService } from 'src/app/service/application/application.service';
import { CreditService } from 'src/app/service/credit/credit.service';
import { ItemListService } from 'src/app/service/item-list/item-list.service';

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

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  getInputStatus(formItem: string) {
    return this.newItem.controls[formItem].dirty && this.newItem.controls[formItem].invalid ? 'danger' : 'basic';
  }

  getInputType() {
    if (this.showNewPass) {
      return 'text';
    }
    return 'password';
  }

  createNewItem(){
    this.creditService.add(this.newCredit);
    this.itemListService.update(3);
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
