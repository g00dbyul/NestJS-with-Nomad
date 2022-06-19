import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from "@nestjs/common";

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

  it('should be 4', () => {
    expect(2+2).toEqual(4)
    expect(2+2).toBe(4)
  })

  describe("Get All", () => {
    it("should return an array", () => {
      const result = service.getAll()
      expect(result).toBeInstanceOf(Array)
    })
  })

  describe("Get One", () => {
    it("Should return movie", () => {
      service.create({
        title: "test",
        genres: ["genre"],
        year: 2000
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    })

    it("Should throw 404 error", () => {
      try {
        service.getOne(9);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
        expect(error.message).toEqual(`Movie whth ID 9 not found`)
      }
    })
  })

  describe("Delete One", () => {
    it("Delete a movie", () => {
      service.create({
        title: "test",
        genres: ["genre"],
        year: 2000
      });
      const beforeDelete = service.getAll()
      service.deleteOne(1)
      const afterDelete = service.getAll()
      expect(afterDelete.length).toEqual(beforeDelete.length - 1)
      expect(afterDelete.length).toBeLessThan(beforeDelete.length)
    })

    it("Should return 404", () => {
      try {
        service.deleteOne(9);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
        expect(error.message).toEqual(`Movie whth ID 9 not found`)
      }
    })
  })

  describe("Create", () => {
    it("Should Create", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: "test",
        genres: ["genre"],
        year: 2000
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toEqual(beforeCreate+1)
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  })

  describe('Update', () => {
    it("Should Update", () => {
      service.create({
        title: "test",
        genres: ["genre"],
        year: 2000
      });
      service.update(1, {title: "Update"})
      const movie = service.getOne(1)
      expect(movie.title).toEqual("Update")
    })

    it('Should 404 error', () => {
      try {
        service.update(9, {title: "Update"});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
        expect(error.message).toEqual(`Movie whth ID 9 not found`)
      }
    })
  })
});
