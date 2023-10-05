import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  login(username: string, password: string) {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('token', '1234567890');
      return {
        'ausername': 'admin',
      };
    } else {
      return {
        'error': 'Invalid credentials',
      };
    }
  }
}
