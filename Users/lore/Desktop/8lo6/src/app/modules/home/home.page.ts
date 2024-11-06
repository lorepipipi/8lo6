import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/managers/StorageService';
import { Router } from '@angular/router';
import { CancelAlertService } from 'src/managers/CancelAlertService';
import { UserLogoutUseCase } from 'src/app/use-cases/LogOut.useCase';
import { PostService } from 'src/managers/addPostService';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;
  posts: any[] = [];

  constructor(
    private router: Router,
    private storageService: StorageService,
    private cancelAlertService: CancelAlertService,
    private logoutUseCase: UserLogoutUseCase,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.loadUser();
    this.loadPosts();
  }

  async loadUser() {
    this.user = await this.storageService.get('user');
  }

  loadPosts() {
    this.posts = this.postService.getPosts();
  }

  onProfileButtonPressed() {
    this.router.navigate(['/profile']);
  }

  async onSignOutButtonPressed() {
    this.cancelAlertService.showAlert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      async () => {
        this.logoutUseCase.performLogout();
        this.router.navigate(['/splash']);
      },
      () => {}
    );
  }

  // Función para editar el post
  onEditPost(postId: string) {
    console.log('Editar post con id:', postId);
    this.router.navigate(['/edit-post', postId]); // Redirige a la página de edición
  }

  // Función para eliminar el post
  onDeletePost(postId: string) {
    this.postService.deletePost(postId);
    this.loadPosts();
  }
}
