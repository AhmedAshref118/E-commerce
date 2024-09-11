import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProudectsService } from '../../core/services/proudects.service';
import { IProduct } from '../../core/interfaces/iproduct'
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink,SearchPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit , OnDestroy {
  private readonly _ProudectsService = inject(ProudectsService);

  private readonly _CartService = inject(CartService)
text : string =""

  productsList:IProduct[]=[] ;

  gatAallProductSub !:Subscription

  
ngOnInit(): void {


    this.gatAallProductSub =   this._ProudectsService.getAllProducts().subscribe({

        next:(res)=>{
          console.log(res.data);

            this.productsList = res.data;
          
        },

        error:(err)=>{
          console.log(err);
          
        }
    })
}

ngOnDestroy():void
{


  this.gatAallProductSub?.unsubscribe()

}

addCart(id:string):void{
  this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{
        console.log(res)
        
    },
  
  
    error:(err)=>
    {
      console.log(err);
      
    }
  })
  }

}


