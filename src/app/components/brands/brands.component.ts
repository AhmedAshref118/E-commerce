import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrands } from '../../core/interfaces/ibrands';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  private readonly _CategoriesService = inject(BrandsService);


  BrandsList:IBrands[]=[] ;

  gatAllBrandsSub !:Subscription

  
ngOnInit(): void {


    this.gatAllBrandsSub =   this._CategoriesService.getAllBrands().subscribe({

        next:(res)=>{
          console.log(res.data);

            this.BrandsList = res.data;
          
        },

        error:(err)=>{
          console.log(err);
          
        }
    })
}

ngOnDestroy():void
{


  this.gatAllBrandsSub?.unsubscribe()


}
}
