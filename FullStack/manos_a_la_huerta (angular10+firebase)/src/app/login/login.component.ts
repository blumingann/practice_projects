import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private auth: AuthService) {}
  faGoogle = faGoogle;

  login() {
    this.auth.login();
  }
}
