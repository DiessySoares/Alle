import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { WebData } from 'src/app/models/webpage-data';
import { ItemListService } from 'src/app/service/item-list/item-list.service';
import { WebpageService } from 'src/app/service/webpage/webpage.service';

@Component({
  selector: 'app-webpage',
  templateUrl: './webpage.component.html',
  styleUrls: ['./../../../../../theme/shared-item-style.scss'],
})
export class WebpageComponent implements OnInit {

  @Input() selected: WebData;

  public newWeb: WebData = {} as WebData;

  showPasswod: boolean = false;
  showNewKey: boolean = false;

  isUpdate = false;
  
  public newItem: FormGroup;

  constructor(private WebService: WebpageService, private itemListService: ItemListService,   private formBuider: FormBuilder, private toastrService: NbToastrService, private dialogService: NbDialogService, public navCtrl: NavController, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.initForms();
  }
  
  public showPassword(){
    this.showPasswod = !this.showPasswod;
  }
  
  private initForms() {
    this.newItem = this.formBuider.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  open(dialog: TemplateRef<any>, updateObject) {
    this.newItem.reset();

    if (updateObject == null) {
      this.newWeb = {} as WebData;
      this.isUpdate = false;
    } else {
      this.newWeb = updateObject;
      this.isUpdate = true;
    }

    this.dialogService.open(dialog);
  }

  
  removeItem(item: WebData) {
    this.WebService.delete(item.id);
    this.itemListService.update(2);
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
      this.WebService.add(Object.assign({}, this.newWeb));
    } else {
      this.WebService.update(Object.assign({}, this.newWeb));
    }

    this.itemListService.update(2);
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
