import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  invalidCredentials: string = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

    this.form = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() {}

  onLogin() {
    const { username, password } = this.form.value;
    const response = this.authService.login(username, password);
    if (response.error) {
      this.invalidCredentials = response.error;
      console.error(response.error);
    } else {
      this.invalidCredentials = '';
      this.router.navigate(['/dashboard/users']);
    }
  }

}
