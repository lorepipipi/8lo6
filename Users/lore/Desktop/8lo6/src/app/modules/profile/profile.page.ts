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
  userName: string = '';
  userPhotoURL: string = 'assets/default-avatar.png';

  constructor(
    private storageService: StorageService,
    private userUpdateUseCase: UserUpdateUseCase,
    private alert: CancelAlertService,
    private actionSheetController: ActionSheetController,
    private uploadUserImageUseCase: UploadUserImageUseCase
  ) { }

  async ngOnInit() {
    const user = await this.storageService.get('user');

    if (user) {
      this.userEmail = user.email || 'Correo no disponible';
      this.userName = user.displayName || 'Nombre no disponible';
      this.userPhotoURL = user.photoURL || 'assets/default-avatar.png';
    }
  }

  async onUpdateButtonPressed() {
    const result = await this.userUpdateUseCase.performUserUpdate(this.userName);

    if (result.success) {
      
      const updatedUser = await this.storageService.get('user');
      this.userName = updatedUser?.displayName || 'Nombre no disponible';

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

            //inicio de contenido nuevo
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
