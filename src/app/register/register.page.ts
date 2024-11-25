import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private router: Router, private storage: Storage) {}

  async register() {
    const user = { email: this.email, password: this.password, role: this.role };
    await this.storage.set(this.email, user);
    this.router.navigate(['/login']);
  }
}
