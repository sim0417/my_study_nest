import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `return One movie ID : ${movieId}`;
  }

  @Post()
  makeOne() {
    return `make one movie`;
  }

  @Delete('/:id')
  deleteOne(@Param('id') movieId: string) {
    return `delete movie ID : ${movieId}`;
  }

  @Patch('/:id')
  updateOne(@Param('id') movieId: string) {
    return `update movie ID : ${movieId}`;
  }
}
