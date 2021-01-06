import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    @Get()
    getAll(){
        return "This API will return all movies";
    }

    @Get('/:id')
    getOne(@Param('id') movieId:string){
        return `This API will return one movie with the id : ${movieId}`;
    }

    @Post()
    create(){
        return `This API will create a movie`;
    }

    @Delete('/:id')
    remove(@Param('id') movieId:string){
        return `This API will delete a movie with the id : ${movieId}`;
    }

    @Patch('/:id')
    patch(@Param('id') movieId:string){
        return `This API will update a movie with the id : ${movieId}`;
    }

}
