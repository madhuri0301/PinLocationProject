import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private router: Router) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      registrationType: 'manual'
    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.valid) {

      let req = {
        firstname: this.registerForm.value.firstname,
        lastname: this.registerForm.value.lastname,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      }
      console.log(req)
      this.http.post<any>("http://localhost:8000/auth/register",this.registerForm.value)
      .subscribe(res=>{
        console.log("User Register Succesfully",res);
        this.registerForm.reset();
        this.router.navigate(['login'])
      },
      err=>{
        console.log("something went wrong");
      })
    }
  }
}