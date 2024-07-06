import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from '../../services/categories.service';
import { Food } from '../../interfaces/food';
import { Category } from '../../interfaces/category';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bo',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './bo.component.html',
  styleUrl: './bo.component.sass'
})
export class BoComponent implements OnInit {

  categories: Category[] = []
  currentCategory?: Category
  allFoods: Food[] = []
  filteredFoods: Food[] = []
  creatingCategory: boolean = false
  newCategory: string = ''

  constructor(private readonly foodService: FoodService,
              private readonly categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.reload()
  }

  /**
   * Recarga la lista de alimentos y categorías
   */
  reload() {
    this.foodService.getFoods().subscribe({
      next: (res: Food[]) => {
        this.allFoods = res
        this.categoriesService.getCategories().subscribe({
          next: (res: Category[]) => {
            this.categories = res
            this.currentCategory = this.currentCategory || this.categories[0]
            this.filterFoods(this.currentCategory.name)
          }, error: (err) => {
            console.log(err);
          }
        });
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  /**
   * Filtra las comidas por categoría
   * @param category Categoría por la que filtrar
   */
  filterFoods(category: string) {
    this.filteredFoods = this.allFoods.filter(food => food.category && food.category.name === category)
  }

  /**
   * Cambia la categoría utilizada para filtrar
   * @param category Categoría a utilizar
   */
  changeCategory(category: Category) {
    this.currentCategory = category
    this.filterFoods(category.name)
  }

  /**
   * Añade una nueva comida (sin guardarla en la base de datos)
   */
  addNewRow() {
    this.allFoods.push({
      available: true,
      name: '',
      description: '',
      imageUrl: '',
      price: 0,
      category: this.currentCategory!,
      editing: true
    })

    this.filterFoods(this.currentCategory!.name)
  }

  /**
   * Guarda o actualiza una comida
   * @param row Comida a guardar o actualizar
   */
  save(row: Food) {
    console.log(row);
    this.foodService.saveFood(row).subscribe({
      next: (res) => {
        this.reload()
      }
    });
    // También debemos cambiar el back para que si es una actualización no se creen duplicados
  }

  /**
   * Setea el flag de edición de una comida y la marca como editable
   * @param row Comida a editar
   */
  edit(row: Food) {
    row.editing = true
  }

  /**
   * Setea el flag de edición de una comida y la marca como no editable
   * @param row Comida a editar
   */
  cancel(row: Food) {
    row.editing = false
    this.reload()
  }

  /**
   * Elimina una comida
   * @param row Comida a eliminar
   */
  delete(row: Food) {
    this.foodService.deleteFood(row._id!).subscribe({
      next: (res) => {
        this.reload()
      }
    });
  }

  /**
   * Setea el flag de creación de categoría
   */
  setCreatingCategory() {
    this.creatingCategory = true
  }

  /**
   * Crea una categoría
   */
  createCategory() {
    this.categoriesService.createCategory(this.newCategory).subscribe({
      next: (res) => {
        this.reload()
        this.creatingCategory = false
      }
    });
  }

  /**
   * Elimina una categoría
   */
  deleteCategory() {
    this.categoriesService.deleteCategory(this.currentCategory!._id!).subscribe({
      next: (res) => {
        this.reload()
      }
    });
  }

}
