import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  private readonly _CategoriesService = inject(CategoriesService);


  categoryList:Icategory[]=[] ;

  gatAllcategorySub !:Subscription

  
ngOnInit(): void {


    this.gatAllcategorySub =   this._CategoriesService.getAllaCtegory().subscribe({

        next:(res)=>{
          console.log(res.data);

            this.categoryList = res.data;
          
        },

        error:(err)=>{
          console.log(err);
          
        }
    })
}

ngOnDestroy():void
{


  this.gatAllcategorySub?.unsubscribe()

}

}


