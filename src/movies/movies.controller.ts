import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
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
  search(@Query('year') year: number) {
    return `return search result, year : ${year}`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  makeOne(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  deleteOne(@Param('id') movieId: number) {
    return this.moviesService.delete(movieId);
  }

  @Patch('/:id')
  updateOne(@Param('id') movieId: number, @Body() movieData: UpdateMovieDto) {
    this.moviesService.update(movieId, movieData);
    return `update movie ID : ${movieId}`;
  }
}
