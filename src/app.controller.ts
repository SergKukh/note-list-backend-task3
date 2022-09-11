import { Controller, Get, Post, Delete, Patch, Body, Param, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateNoteDto, FindOneParams } from './data/dto';
import { ValidationPipe } from './pipes/validation.pipe';

@Controller('notes')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UsePipes(ValidationPipe)
  @Post()
  createNote(@Body() dto: CreateNoteDto) {
    return this.appService.createNote(dto);
  }

  @UsePipes(ValidationPipe)
  @Delete(':id')
  deleteNote(@Param() params: FindOneParams) {
    return this.appService.deleteNote(+params.id);
  }

  @UsePipes(ValidationPipe)
  @Patch(':id')
  editNote(@Param() params: FindOneParams, @Body() dto: CreateNoteDto) {
    return this.appService.editNote(+params.id, dto);
  }

  @Get('stats')
  getStats() {
    return this.appService.getStats();
  }

  @UsePipes(ValidationPipe)
  @Get(':id')
  getNote(@Param() params: FindOneParams) {
    return this.appService.getNote(+params.id);
  }

  @Get()
  getNotes() {
    return this.appService.getNotes();
  }
}
