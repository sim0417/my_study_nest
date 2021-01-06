import { Body, Query } from '@nestjs/common';
import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    @Get()
    getAll(){
        return "This API will return all movies";
    }

    @Get('search')
    search(@Query("year") searchYear:string){
        return `We are searching for a movie made after : ${searchYear}`;
    }

    @Get(':id')
    getOne(@Param('id') movieId:string){
        return `This API will return one movie with the id : ${movieId}`;
    }

    @Post()
    create(@Body() movieData){
        return movieData;
    }

    @Delete(':id')
    remove(@Param('id') movieId:string){
        return `This API will delete a movie with the id : ${movieId}`;
    }

    @Patch(':id')
    patch(@Param('id') movieId:string, @Body() movieData){
        return {
            updateMovie : movieId,
            ...movieData
        }
    }

}
