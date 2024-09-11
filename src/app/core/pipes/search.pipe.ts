import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObject:IProduct[] , tit:string ): any[] {


    return arrayOfObject.filter( (item)=> item.title ) ;
  
  
  }

}
