import { Component } from '@angular/core';
import { DishService } from 'src/app/services/dish.service';
import { Dish } from 'src/app/models/dish';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DishService]
})
export class AppComponent {
  
  public title:string;
  public dish:Dish;
  public ok:string;

constructor( private _dishService:DishService){
  this.title = 'create dish';
  this.dish = new Dish("","","","");
}

onSubmit(form){
  console.log(this.dish);
  this._dishService.saveDish(this.dish).subscribe(
    res => {
      if (res){
        this.ok = 'yes';
        form.reset();
      }else{
        this.ok = 'no';
      }
      
    },
    err => {
      console.log(err);
      
    }
  );
  
}

}
