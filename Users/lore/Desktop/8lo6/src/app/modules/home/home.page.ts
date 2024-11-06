import { Component } from '@angular/core';
import { StorageService } from 'src/managers/StorageService';
import { Router } from '@angular/router';
import { CancelAlertService } from 'src/managers/CancelAlertService';
import { UserLogoutUseCase } from 'src/app/use-cases/LogOut.useCase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  user: any;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private cancelAlertService: CancelAlertService,
    private logoutUseCase: UserLogoutUseCase
  ) {}

  async ionViewDidEnter() {
    this.user = await this.storageService.get('user');
    if (!this.user) {
      console.log('No se encontraron datos del usuario.');
    }
  }

  onProfileButtonPressed() {
    this.router.navigate(['/profile'])
  }

  async onSignOutButtonPressed() {
    this.cancelAlertService.showAlert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      async () => {
        this.logoutUseCase.performLogout();
        this.router.navigate(['/splash']);
      },
      () => { }
    );
  }

  onSubirImagenButtonPressed() {
    this.router.navigate(['/add-posts'])
  }

}
