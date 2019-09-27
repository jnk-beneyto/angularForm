import { Component,OnInit } from '@angular/core';
import { DishService } from 'src/app/services/dish.service';
import { Dish } from 'src/app/models/dish';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css'],
  providers: [DishService]
})
export class AddDishComponent implements OnInit {

  public title: string;
  public dish: Dish; 
  public ok: string;
  public dishes: [Dish];

  constructor(private _dishService: DishService) {
    this.title = 'Create dish';
    //this.dish = new Dish("", "", "", "");
  }

  ngOnInit(){
    this.resetForm();
    this.refreshDishList();
  }
  resetForm(form? : NgForm){
    if (form)
      form.reset();
      this._dishService.selectedDish = {
        _id:"",
        name:"",
        type:"",
        description:""
      }
  }

  onSubmit(form : NgForm) {
    if(form.value._id == "" || form.value._id == null){

      this._dishService.saveDish(form.value).subscribe(
        res => {
          if (res) {
            this.ok = 'yes';
            this.resetForm(form);
            this.refreshDishList();
          } else {
            this.ok = 'no';
          }
        },
        err => {
          console.log(err);
        }
      );
    }else{
      this._dishService.updateDish(form.value).subscribe(
        res => {
          if (res) {
            this.ok = 'yes';
            this.resetForm(form);
            this.refreshDishList();
          } else {
            this.ok = 'no';
          }
        },
        err => {
          console.log(err);
        }
      )
    }
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

  deleteDish(dish : Dish, form : NgForm) {

    this._dishService.deleteDish(dish).subscribe(
      res => {
        if (res) {
          console.log('deleted id: ' + dish._id);
          this.resetForm(form);
          this.refreshDishList();
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  editDish(dish : Dish){
    this._dishService.selectedDish = dish;
  }

  refreshDishList(){
    this._dishService.getDishes().subscribe((res) =>{
      this._dishService.dishes = res as Dish[];
    })
  }
}
