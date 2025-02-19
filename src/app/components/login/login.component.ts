import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CremService } from '../../services/crem.service';
import { Router } from '@angular/router';
import { AlertHandlerService } from '../../alert-handler.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private alertService: AlertHandlerService,
    private fb: FormBuilder,
    private cremService: CremService,
    private route: Router
  ) {}

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  submitForm() {
    if (this.loginForm.valid) {
      this.cremService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          this.cremService.storeTokens(
            response.access_token,
            response.refresh_token
          );
          this.alertService.handleSuccess('Login successful', 1500);
          this.route.navigate(['/home']);
        },
        error: (error) => {
          this.alertService.handlerError(error);
        },
      });

      this.loginForm.reset();
    }
  }
}
