import { IProduct } from './../../core/interfaces/iproduct';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProudectsService } from '../../core/services/proudects.service';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {

        private readonly _ActivatedRoute =inject(ActivatedRoute)
        private readonly _ProudectsService =inject(ProudectsService)


       

        getSpecificProducts!:Subscription


        detailsProduct: IProduct |null = null ;



        
  ngOnInit(): void {

        this.getSpecificProducts = this._ActivatedRoute.paramMap.subscribe({
        

        next:( p )=>{
          let idProduct = (p.get('id'));
          
        this._ProudectsService.getSpecificProducts(idProduct).subscribe({

      next:(res)=>{
            console.log(res.data);
            this.detailsProduct = res.data ;
      },

      error:(err)=>{
        console.log(err);
        
      }

        })
        }

      
      })

  }

  ngOnDestroy():void
{


  this.getSpecificProducts.unsubscribe()

}

}
