import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    // TODO : get real data
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  delete(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  create(movieData: CreateMovieDto) {
    return this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, movieData: UpdateMovieDto) {
    this.getOne(id);
    for (let i = 0; i < this.movies.length; i++) {
      if (this.movies[i].id === id) {
        this.movies[i] = { ...this.movies[i], ...movieData };
        break;
      }
    }
  }
}
