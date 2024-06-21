import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-bo',
  standalone: true,
  imports: [
    HttpClientModule
  ],
  templateUrl: './bo.component.html',
  styleUrl: './bo.component.sass'
})
export class BoComponent implements OnInit {

  categories = []
  currentCategory = ''
  allFoods: any[] = []
  filteredFoods: any[] = []

  constructor(private readonly foodService: FoodService,
              private readonly categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.foodService.getFoods().subscribe({
      next: (res: any) => {
        this.allFoods = res
        this.categoriesService.getCategories().subscribe({
          next: (res: any) => {
            this.categories = res.map((category: any) => category.name)
            this.currentCategory = this.categories[0]
            this.filterFoods(this.currentCategory)
          }, error: (err: any) => {
            console.log(err);
          }
        });
      }, error: (err: any) => {
        console.log(err);
      }
    });
  }

  filterFoods(category: string) {
    this.filteredFoods = this.allFoods.filter(food => food.category && food.category.name === category)
  }

  changeCategory(category: string) {
    this.currentCategory = category
    this.filterFoods(category)
  }

  addNewRow() {
    this.allFoods.push({
      name: '',
      description: '',
      imageUrl: '',
      price: 0,
      category: this.filteredFoods[0].category,
      editing: true
    })

    this.filterFoods(this.currentCategory)
  }

  save() {
    // Se guarda la fila en base de datos, y se recargan todos los datos
    // También debemos cambiar el back para que si es una actualización no se creen duplicados
  }

  edit() {
    // Se marca la fila como editable
  }

  delete() {
    // Se elimina la fila de la base de datos y se recargan todos los datos
  }

}
