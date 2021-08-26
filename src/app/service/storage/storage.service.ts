import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private _storage: Storage ;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, text: any) {
    this._storage?.set(key, text);
  }

  public async get(key: string): Promise<any> {
      return await this._storage.get(key);
  }

  public async remove(key: string) {
    this._storage.remove(key);
  }

}