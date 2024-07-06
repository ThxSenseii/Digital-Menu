import { Component } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/category';
import { Food } from '../../interfaces/food';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.sass'
}
)
export class MenuComponent {
  categories: Category[] = []
  currentCategory?: Category
  allFoods: Food[] = []
  filteredFoods: Food[] = []
 constructor (private readonly foodService:FoodService,private readonly categoryService:CategoriesService){}
ngOnInit(){
  this.categoryService.getCategories().subscribe(res => {this.categories = res} )
}
  filterFood () {
    this.filteredFoods = this.allFoods.filter (x => x.category._id === this.currentCategory?._id).filter(x => x.category._id === this.currentCategory?._id)
  }
}
