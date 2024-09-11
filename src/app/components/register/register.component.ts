
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  
  msgError:string ='';
  isLoding:boolean = false;

    private  readonly _AuthService = inject(AuthService);
    private  readonly _Router = inject(Router);

  registerForm:FormGroup = new FormGroup({
    
    name : new FormControl(null,
      [Validators.required , Validators.minLength(3) , Validators.maxLength(25) ]),

    email: new FormControl(null,
      [Validators.required , Validators.email]),

    password: new FormControl(null,[ Validators.required , Validators.pattern(/^\w{6,}$/)]),

    rePassword: new FormControl(null ),

    phone: new FormControl(null ,[Validators.required  ,Validators.pattern(/^01[0125][0-9]{8}$/)])







  }  , this.confirmPassword); 

 




confirmPassword( g:AbstractControl)
{

if(g.get('password')?.value === g.get('rePassword')?.value)
{
  return null
}
else
{
  return  {mismatch:true}
}

}


registerSub !:Subscription

registerSubmit():void
  
  
{
  

this.isLoding = true ;
  if(this.registerForm.valid)
    {
    this.registerSub =  this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res)


          if(res.message == 'success')
          {
            
          this._Router.navigate(['/login'])
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
      this.registerForm.markAllAsTouched()
    }

  
}

ngOnDestroy(): void {
  this.registerSub?.unsubscribe()
  
}




}
