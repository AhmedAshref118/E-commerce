import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProudectsService } from '../../core/services/proudects.service';
import { IProduct } from '../../core/interfaces/iproduct'
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,SearchPipe ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy { 

  private readonly _ProudectsService = inject(ProudectsService);
  private readonly _CategoriesService = inject(CategoriesService);
private readonly _CartService = inject(CartService)
private readonly _ToastrService = inject(ToastrService)
text : string =""
  productsList:IProduct[]=[] ;
  categoriesList:Icategory[]=[];

  gatAallProductSub !:Subscription;

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 500,
    navText: ['<i class="fa-solid fa-angles-left text-main "></i>',
        '<i class="fa-solid fa-angles-right text-main"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1100: {
        items: 6
      }

    },
    nav: true
  }

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 500,
    navText: ['<i class="fa-solid fa-angles-left text-main "></i>',
        '<i class="fa-solid fa-angles-right text-main"></i>'],
    items:1,
    nav: false,
  }

  
ngOnInit(): void {




  // --------------------------------//

    this._CategoriesService.getAllaCtegory().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoriesList = res.data;
      },

      error:(err)=>{
        console.log(err);
      }

    })

    // -----------------------------//


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


// -----------------------------------//


ngOnDestroy():void
{


  this.gatAallProductSub?.unsubscribe()

}


addCart(id:string):void{
this._CartService.addProductToCart(id).subscribe({
  next:(res)=>{
      console.log(res)
      this._ToastrService.success(res.message , 'frach cart')
  },


  error:(err)=>
  {
    console.log(err);
    
  }
})
}

}
