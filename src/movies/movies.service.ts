import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    // TODO : get real data
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === Number(id));
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  delete(id: string) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== Number(id));
  }

  create(movieData: any) {
    return this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: string, movieData: any) {
    this.getOne(id);
    for (let i = 0; i < this.movies.length; i++) {
      if (this.movies[i].id === Number(id)) {
        this.movies[i] = { ...this.movies[i], ...movieData };
        break;
      }
    }
  }
}
