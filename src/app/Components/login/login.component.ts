import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  submitted = false;
    

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}
   
  async ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.loginForm.controls; }
  
  
  

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {

      let req = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      console.log(req)
     
      this.http.post<any>("http://localhost:8000/auth/login", this.loginForm.value)
        .subscribe((res:any) => {
          console.log("User logged in",res);
          localStorage.setItem("token",res.access_token)
          this.router.navigateByUrl('/dashboard/map');
        },
        
          err => {
            console.log("something went wrong");
          })
    }
  }

}
