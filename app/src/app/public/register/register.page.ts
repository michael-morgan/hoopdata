import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private credentialsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['']
    });
  }

  public onSubmit() {
    this.authService.register(this.credentialsForm.value).subscribe(res => {
      this.authService.login(this.credentialsForm.value).subscribe();
    });
  }
}
