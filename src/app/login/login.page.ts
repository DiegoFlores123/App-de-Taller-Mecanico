import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';  // Importa ToastController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  rememberMe: boolean = false;  // Variable para "Recordar contraseña"

  constructor(
    private router: Router,
    private storage: Storage,
    private toastController: ToastController  // Inyecta ToastController
  ) {}

  async ngOnInit() {
    await this.storage.create();

    // Recupera el email si "Recordar contraseña" está habilitado
    const rememberedEmail = await this.storage.get('rememberedEmail');
    if (rememberedEmail) {
      this.email = rememberedEmail;
      this.rememberMe = true;
    }
  }

  async login() {
    const user = await this.storage.get(this.email);

    if (user && user.password === this.password) {
      // Almacenar el email si "Recordar contraseña" está habilitado
      if (this.rememberMe) {
        await this.storage.set('rememberedEmail', this.email);
      } else {
        await this.storage.remove('rememberedEmail');
      }

      // Verificar el rol del usuario y redirigir a la página correspondiente
      if (user.role === 'Administrador') {
        this.router.navigate(['/menu']);  // Puedes redirigir a la página de menú para todos los roles
      } else if (user.role === 'Mecánico') {
        this.router.navigate(['/menu']);  // Igual que el rol de Administrador
      } else if (user.role === 'Cajero') {
        this.router.navigate(['/menu']);  // Igual que el rol de Administrador
      }
    } else {
      // Mostrar mensaje de error si las credenciales son incorrectas
      this.showToast('Usuario o contraseña incorrectos');
    }
  }

  goToRegister() {
    // Navegar a la página de registro
    this.router.navigate(['/register']);
  }

  // Función para mostrar un Toast
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,  // Duración del toast en milisegundos
      position: 'top',  // Posición del toast
    });
    toast.present();  // Muestra el toast
  }
}
