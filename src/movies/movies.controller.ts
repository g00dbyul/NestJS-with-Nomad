import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDTO } from "./dto/create-movie.dto";
import { UpdateMovieDTO } from "./dto/update-movie.dto";

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll() {
    return this.moviesService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.moviesService.getOne(id)
  }

  @Get('/search')
  search(@Query('year') year: string) {
    return `Search Movie ${year}`
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  deleteByID(@Param('id') id:number) {
    return this.moviesService.deleteOne(id)
  }

  @Put('/:id')
  updateByID(@Param('id') id: number, @Body() updateData: UpdateMovieDTO) {
    this.moviesService.update(id, updateData)
    return {
      id,
      ...updateData
    }
  }

}
