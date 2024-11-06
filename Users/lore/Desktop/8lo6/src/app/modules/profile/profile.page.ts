import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/managers/StorageService';
import { UserUpdateUseCase } from 'src/app/use-cases/ChangeProfile.useCase';
import { CancelAlertService } from 'src/managers/CancelAlertService';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UploadUserImageUseCase } from 'src/app/use-cases/ChangePhoto.useCase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userEmail: string = '';
  userName: string = '';  // Para almacenar el nombre de usuario
  userPhotoURL: string = 'assets/default-avatar.png'; // Imagen predeterminada

  constructor(
    private storageService: StorageService,
    private userUpdateUseCase: UserUpdateUseCase,
    private alert: CancelAlertService,
    private actionSheetController: ActionSheetController,
    private uploadUserImageUseCase: UploadUserImageUseCase
  ) { }

  async ngOnInit() {
    // Recupera el usuario guardado en StorageService
    const user = await this.storageService.get('user');

    // Verifica si el usuario existe antes de asignar valores
    if (user) {
      // Asigna valores al nombre, correo y foto
      this.userEmail = user.email || 'Correo no disponible';
      this.userName = user.displayName || 'Nombre no disponible';
      this.userPhotoURL = user.photoURL || 'assets/default-avatar.png';
    }
  }

  async onUpdateButtonPressed() {
    const result = await this.userUpdateUseCase.performUserUpdate(this.userName);

    if (result.success) {
      this.alert.showAlert(
        'Actualización exitosa',
        'Tu perfil ha sido actualizado correctamente.',
        () => { }
      );
    } else {
      this.alert.showAlert(
        'Error',
        result.message,
        () => { }
      );
    }
  }

  async onProfileImagePressed() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una opción',
      buttons: [
        {
          text: 'Cámara',
          icon: 'camera',
          handler: async () => {
            const image = await Camera.getPhoto({
              quality: 90,
              allowEditing: false,
              resultType: CameraResultType.DataUrl,
              source: CameraSource.Camera,
            });

            const imageUrl = image.dataUrl;
            this.userPhotoURL = imageUrl;  // Actualiza la URL de la foto
          }
        },
        {
          text: 'Imágenes',
          icon: 'image',
          handler: async () => {
            const image = await Camera.getPhoto({
              quality: 90,
              allowEditing: false,
              resultType: CameraResultType.DataUrl,
              source: CameraSource.Photos,
            });

            const imageUrl = image.dataUrl;

            // Subir la imagen
            const uploadResult = await this.uploadUserImageUseCase.UploadUserImage(imageUrl);
            if (uploadResult.success) {
              this.alert.showAlert(
                'Imagen Actualizada',
                'Tu imagen de perfil ha sido actualizada con éxito.',
                () => {
                  this.userPhotoURL = imageUrl;
                }
              );
            } else {
              this.alert.showAlert(
                'Error',
                uploadResult.message,
                () => { }
              );
            }
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });
    await actionSheet.present();
  }
}
