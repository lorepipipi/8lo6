import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CancelAlertService } from 'src/managers/CancelAlertService';
import { UserRegistrationUseCase } from 'src/app/use-cases/Registration.useCase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage {

  email: string = '';
  user: string = '';
  password: string = '';

  constructor(
    private userRegistrationUseCase: UserRegistrationUseCase,
    private router: Router,
    private alert: CancelAlertService
  ) { }

  async onRegisterButtonPressed() {
    const result = await this.userRegistrationUseCase.performRegistration(this.email, this.user, this.password);

    if (result.success) {
      this.alert.showAlert(
        'Registro exitoso',
        'Ya eres parte de nuestro sistema',
        () => {
          this.router.navigate(['/splash']);
        }
      );
    } else {
      this.alert.showAlert(
        'Error',
        result.message,
        () => {
          this.clean();
        }
      );
    }
  }

  clean() {
    this.email = '';
    this.password = '';
  }
}

