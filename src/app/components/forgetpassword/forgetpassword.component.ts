import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
private readonly _AuthService = inject(AuthService)

private readonly _Router = inject(Router)
  step:number = 1;
  verfyEmail:FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required , Validators.email])
  })
 
  verfyCode:FormGroup = new FormGroup({
    resetCode :new FormControl(null , [Validators.required , Validators.pattern(/^[0-9]{6}$/)])

  })


  resetPassword:FormGroup = new FormGroup({

    email : new FormControl(null , [Validators.required , Validators.email]),
    newPassword: new FormControl(null,[ Validators.required , Validators.pattern(/^\w{6,}$/)])




  })


  emailSub():void{

      let emailValue = this.verfyEmail.get('email')?.value

      this.resetPassword.get('email')?.patchValue (emailValue)
this._AuthService.setEmailVerify(this.verfyEmail.value).subscribe({



  next:(res)=>{
console.log(res);

if(res.statusMsg === 'success'){
  this.step = 2;

}
  },


  error:(err)=>{
console.log(err);

  }
})
  }


  codeSub():void{
    this._AuthService.setCodeVerify(this.verfyCode.value).subscribe({
    
    
    
      next:(res)=>{
    console.log(res);
    
    if(res.status === 'Success'){
      this.step = 3;
    
    }
      },
    
    
      error:(err)=>{
    console.log(err);
    
      }
    })
      }



      passSub():void{
        this._AuthService.setresetPassword(this.resetPassword.value).subscribe({
        
        
        
          next:(res)=>{
        console.log(res);
        localStorage.setItem('userToken' , res.token);

        this._AuthService.saveUserData()


        this._Router.navigate(['/home'])
          },
        
        
          error:(err)=>{
        console.log(err);
        
          }
        })
          }
    
}
