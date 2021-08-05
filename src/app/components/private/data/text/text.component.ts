import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TextData } from 'src/app/models/text-data';
import { ItemListService } from 'src/app/service/item-list/item-list.service';
import { TextService } from 'src/app/service/text/text.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {

  @Input() selected: TextData;

  newText: TextData = {} as TextData;

  showTxt: boolean = false;

  public newItem: FormGroup;


  constructor(private itemListService: ItemListService, private textData: TextService, private formBuider: FormBuilder, private toastrService: NbToastrService, private dialogService: NbDialogService, public navCtrl: NavController, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.initForms();
  }
  
  
  private initForms() {
    this.newItem = this.formBuider.group({
      text: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  getInputStatus(formItem: string) {
    return this.newItem.controls[formItem].dirty && this.newItem.controls[formItem].invalid ? 'danger' : 'basic';
  }

  createNewItem(){
    this.textData.add(this.newText);
    this.itemListService.update(6);
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
  
  public showText(){
    this.showTxt = !this.showTxt;
  }

}
