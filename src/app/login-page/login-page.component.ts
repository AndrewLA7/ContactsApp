import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserModel } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  protected destroy$: Subject<void> = new Subject<void>();
  
  authForm: FormGroup;
  submitted = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  get formControls() {
    return this.authForm.controls;
  }

  private initForm() {
    this.authForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  logIn(email: string, password: string) {
    this.apiService
      .login(email, password)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((x) => {
        return x && this.router.navigate(['contacts']); 
      });
  }

  onSubmit() {
    this.submitted = true;
    if(this.authForm.invalid) {
      return;
    }
    const credentials: UserModel = this.authForm.getRawValue();
    this.logIn(credentials.email, credentials.password);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
