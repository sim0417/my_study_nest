import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('search')
  search(@Query('year') year: string) {
    return `return search result, year : ${year}`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  makeOne(@Body() movieData: any) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  deleteOne(@Param('id') movieId: string) {
    return this.moviesService.delete(movieId);
  }

  @Patch('/:id')
  updateOne(@Param('id') movieId: string, @Body() movieData: any) {
    this.moviesService.update(movieId, movieData);
    return `update movie ID : ${movieId}`;
  }
}
