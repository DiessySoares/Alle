import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { EmailData } from 'src/app/models/email-data';
import { EmailService } from 'src/app/service/email/email.service';
import { ItemListService } from 'src/app/service/item-list/item-list.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./../../../../../theme/shared-item-style.scss'],
})
export class EmailComponent implements OnInit {

  @Input() selected: EmailData;
  public newEmail: EmailData = {} as EmailData;

  showPasswod: boolean = false;
  showNewKey: boolean = false;
  
  public newItem: FormGroup;

  constructor(private itemListService: ItemListService, private emailService: EmailService, private formBuider: FormBuilder, private toastrService: NbToastrService, private dialogService: NbDialogService, public navCtrl: NavController, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.initForms();
  }
  
  public showPassword(){
    this.showPasswod = !this.showPasswod;
  }
  
  private initForms() {
    this.newItem = this.formBuider.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.required],

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
    this.emailService.add(this.newEmail);
    this.itemListService.update(4);
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

  public getName(email: string): string {
    return email.substring(0, email.indexOf("@"));
  }
}
