import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from './../user/user.service'


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private toastrService: NbToastrService, private router: Router, private userService: UserService) { }

    private userLoggedIn: User = null;
    private passwordSession: string = "";

    public login(username: string, password: string): boolean {

        if(this.userService.exist(username)) {

            this.digestMessage(password).then(passSHA512 => {
                this.userLoggedIn = this.userService.users.find(x => x.name == username);
                if(this.userLoggedIn.passwordSHA512 == passSHA512) {
                    this.passwordSession = password;
                    this.router.navigate(['home']);
                } else {
                    this.userLoggedIn == null;
                    this.toastrService.show('Usuario ou senha incorretos!', 'Erro!',
                    {
                        status: 'danger',
                        position: <any>'top-right',
                        duration: <any>'3000',
                        preventDuplicates: true
                    });
                    return false;
                }
            })
        } else {
            this.toastrService.show('Conta nao encontrada!', 'Erro!',
            {
                status: 'danger',
                position: <any>'top-right',
                duration: <any>'3000',
                preventDuplicates: true
            });
            return false;
        }
    }

    canActivate(): Observable<boolean> | boolean {
        return this.isAuthenticated();
    }
    /*
    To crypt and decrypt string
    */
    public getPasswordSession(){
        return this.passwordSession;
    }

    logout() {
        this.userLoggedIn = null;
        this.passwordSession = "";
        this.router.navigate(['login']);
    }

    public currentUser(): User {
        return this.userLoggedIn;
    }

    public currentUserName(): string {
        return this.userLoggedIn.name;
    }

    public isAuthenticated(): boolean {
        return this.userLoggedIn != null;
    }

    public async digestMessage(message) {
        const msgUint8 = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-512', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

}