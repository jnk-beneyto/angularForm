import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish';
import { DishService } from 'src/app/services/dish.service';


@Component({
  selector: 'app-list-dish',
  templateUrl: './list-dish.component.html',
  styleUrls: ['./list-dish.component.css'],
  providers: [DishService]
})
export class ListDishComponent implements OnInit {
  public title: string;
  public dishes: [Dish];

  constructor(private _dishService: DishService) {
    this.title = "list Dishes";
  }

  ngOnInit() {
    this.getDishes();
  }

  getDishes() {
    this._dishService.getDishes().subscribe(
      //res => {dishes:res}
      res => {
        if (res) {
          console.log(res);
          this.dishes = res;
        }
      }

      ,
      err => {
        console.log(err);
      }
    );
  }

  deleteDish(id) {
    this._dishService.deleteDish(id).subscribe(
      res => {
        if (res) {
          console.log('deleted id: ' + id);
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}
