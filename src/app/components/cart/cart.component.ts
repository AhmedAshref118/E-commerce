import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { error } from 'console';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {



  private readonly _CartService = inject(CartService)

cartItem : Icart = {} as Icart;


  ngOnInit(): void {
      this._CartService.getProductToCart().subscribe({
      next:(res)=>{

console.log(res.data);
this.cartItem = res.data

      },

      error:(err)=>{

        console.log(err);
        
      }
      })
  }


  removeItem(id:string):void{
    this._CartService.deletSpecificCartItem(id).subscribe({


      next:(res)=>{

        console.log(res);


        this.cartItem = res.data 
        
              },
        
              error:(err)=>{
        
                console.log(err);
                
              }


    })


  }


  updateCount(id:string , count:number):void{
    
if(count > 0)
{
  
  this._CartService.updateProductQuantity(id , count).subscribe({

    next:(res)=>{

      console.log(res.data);
                this.cartItem = res.data 
            },


            error:(err)=>{
      
              console.log(err);
              
            }
  })

}

  }



  clearItems():void{
    this._CartService.clearCart().subscribe({
      next:(res)=>{

        console.log(res.data);
if(res.message == 'success')
{
  this.cartItem = {}as Icart;
}
        
              },
        
              error:(err)=>{
        
                console.log(err);
                
              }
    })
  }
}
