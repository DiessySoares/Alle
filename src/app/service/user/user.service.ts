import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore, private toastrService: NbToastrService) { }

  readonly collectionName = "Users";

  users: Array<User> = null;

  ngOnInit() {
    this.getUserList().subscribe(async data => {
      this.users = data.map(get => {
        return {
          id: get.payload.doc.id,
          name: get.payload.doc.data()['name'],
          email: get.payload.doc.data()['email'],
          passwordSHA512: get.payload.doc.data()['passwordSHA512'],
          aplication: get.payload.doc.data()['aplication'],
          creditCard: get.payload.doc.data()['creditCard'],
          emailData: get.payload.doc.data()['emailData'],
          textData: get.payload.doc.data()['textData'],
          webData: get.payload.doc.data()['webData'],
          wifiData: get.payload.doc.data()['wifiData'],
          created_at: get.payload.doc.data()['created_at'],
          updated_at: get.payload.doc.data()['updated_at'],
        } as User;
      })
    });
  }

  getUserDoc(id) {
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .valueChanges()
  }

  getUserList() {
    return this.firestore
      .collection(this.collectionName)
      .snapshotChanges();
  }

  exist(username: string){
    return !(this.users?.find(x => x.name == username) == null)
  }

  async createUser(user: User) {
    user.name;
    user.passwordSHA512 = await this.digestMessage(user.passwordSHA512);
    user.email;
    user.created_at = new Date();

    user.aplication = [];
    user.creditCard = [];
    user.emailData = [];
    user.textData = [];
    user.webData = [];
    user.wifiData = [];

    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(this.collectionName)
        .add(user)
        .then(response => { }, error => this.showErrorToast());
    });
  }

  deleteUser(user) {
    return this.firestore
      .collection(this.collectionName)
      .doc(user.id)
      .delete();
  }

  updateUser(user: User) {
    user.updated_at = new Date();

    console.log(user);

    return this.firestore
      .collection(this.collectionName)
      .doc(user.id)
      .update(user);
  }

  showErrorToast() {
    this.toastrService.show('Erro ao salvar conta!',
      'Erro!',
      {
        status: 'danger',
        position: <any> 'top-right',
        duration: <any> '3000'
      });
  }

  public async digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-512', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
}
