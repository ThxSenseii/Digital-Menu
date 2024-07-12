import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FoodService } from '../../services/food.service';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/category';
import { Food } from '../../interfaces/food';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  categories: Category[] = [];
  currentCategory?: Category;
  allFoods: Food[] = [];
  filteredFoods: Food[] = [];

  constructor(
    private readonly foodService: FoodService,
    private readonly categoryService: CategoriesService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadFoods();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  loadFoods() {
    this.foodService.getFoods().subscribe({
      next: (res: Food[]) => {
        this.allFoods = res;
        this.filterFoods();
      },
      error: (err) => {
        console.error('Error loading foods:', err);
      }
    });
  }

  changeCategory(categoryId: string) {
    this.currentCategory = this.categories.find(category => category._id === categoryId);
    this.filterFoods();
  }

  filterFoods(searchTerm: string = '') {
    this.filteredFoods = this.allFoods.filter(food =>
      (!this.currentCategory || food.category._id === this.currentCategory._id) &&
      (searchTerm === '' || food.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.filterFoods(inputElement.value);
  }

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.changeCategory(selectElement.value);
  }

  trackByFood(index: number, food: Food) {
    return food._id;
  }
}
