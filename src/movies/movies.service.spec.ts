import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { Console } from 'console';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', () => {
      const before = service.getAll().length;
      service.create({
        title: 'Test movie',
        year: 2021,
        genres: ['action', 'drama'],
      });
      const after = service.getAll().length;
      const movie = service.getOne(1);
      expect(after).toBeGreaterThan(before);
      expect(movie).toStrictEqual({
        id: 1,
        title: 'Test movie',
        year: 2021,
        genres: ['action', 'drama'],
      });
    });
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test movie',
        year: 2021,
        genres: ['action', 'drama'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie).toStrictEqual({
        id: 1,
        title: 'Test movie',
        year: 2021,
        genres: ['action', 'drama'],
      });
      expect(service.getAll().length).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(-1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with ID -1 not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.create({
        title: 'Test movie',
        year: 2021,
        genres: ['action', 'drama'],
      });

      const before = service.getAll().length;
      service.delete(1);
      const after = service.getAll().length;

      expect(after).toBeLessThan(before);
    });
    it('should return 404 error', () => {
      try {
        service.delete(-1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with ID -1 not found.');
      }
    });
  });

  describe('update', () => {
    it('should update movie', () => {
      service.create({
        title: 'Test movie',
        year: 2021,
        genres: ['action', 'drama'],
      });

      service.update(1, { title: 'Update Test' });

      const movie = service.getOne(1);
      expect(movie).toStrictEqual({
        id: 1,
        title: 'Update Test',
        year: 2021,
        genres: ['action', 'drama'],
      });
    });

    it('should return 404 error', () => {
      try {
        service.update(-1, {
          title: 'Test2',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with ID -1 not found.');
      }
    });
  });
});
