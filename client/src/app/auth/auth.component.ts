import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @Input() socket: any;
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.initForm();

    this.socket.on('goToAdminPanel', () => {
      this.authService.connection();
    })
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      pseudo: ['', Validators.required],
      password: ['', Validators.required]
    })
  };
  
  onSignIn() {
    const pseudo = this.userForm.value['pseudo'];
    const password = this.userForm.value['password'];
    const data = {
      pseudo: pseudo,
      password: password
    }
    this.socket.emit('joinAdmin', data)
  }
}
