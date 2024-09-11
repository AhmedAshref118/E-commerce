import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  
    
    msgError:string ='';
    isLoding:boolean = false;
  
      private  readonly _AuthService = inject(AuthService);
      private  readonly _Router = inject(Router);
  
    loginForm:FormGroup = new FormGroup({
      
      
      email: new FormControl(null,
        [Validators.required , Validators.email]),
      password: new FormControl(null,[ Validators.required , Validators.pattern(/^\w{6,}$/)]),
      
  
  
  
  
  
  
    }); 
  
  
  
  registerSubmit():void
    
    
  {
    
  
  this.isLoding = true ;
    if(this.loginForm.valid)
      {
        this._AuthService.setloginForm(this.loginForm.value).subscribe({
          next:(res)=>{
            console.log(res)
  
  
            if(res.message == 'success')
            {
              

              localStorage.setItem('userToken' ,res.token )

              
              this._AuthService.saveUserData()


            this._Router.navigate(['/home'])
            }
  
  
            this.isLoding = false;
  
  
          },
  
          error:(err:HttpErrorResponse)=>{
            this.msgError = err.error.message
            
            console.log(err);
            this.isLoding = false;
            
          }
        })
      
      
      }
      else
      {
        this.loginForm.markAllAsTouched()
      }
  
    
  }
  
  
  
  
  
  
  }
  

