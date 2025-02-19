import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { DtoBaseResponse } from 'src/dto/base.dto';
import { DtoCategory, DtoUpdateCategories } from 'src/dto/producto.dto';

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) { }


    @Get()
    async getCategories() {
        return await this.categoryService.getCategories();
    }

    @Post()
    async createCategory(@Body() category: DtoCategory): Promise<DtoBaseResponse> {
        return await this.categoryService.createCategory(category);
    }
    @Put()
    async updateCategory(@Body() category: DtoUpdateCategories): Promise<DtoBaseResponse> {
        return await this.categoryService.updateCategory(category);
    }
    @Delete('/:id')
    async deleteCategory(@Param('id') id: string): Promise<DtoBaseResponse> {
        return await this.categoryService.deleteCategory(Number(id));
    }
}
