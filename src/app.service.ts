import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './data/dto';
import mockData from './data/mockData';
import { getDate } from './utils/utils';

@Injectable()
export class AppService {

  createNote(dto: CreateNoteDto) {
    const note = {
      id: Date.now(),
      created: getDate(),
      content: dto.content,
      categoryName: dto.categoryName,
      archived: false
    };
    mockData.notes.push(note);
    return this.sendNote(note);
  }

  deleteNote(id: number) {
    mockData.notes = mockData.notes.filter(note => note.id !== id);
    return id;
  }

  editNote(id: number, dto: CreateNoteDto) {
    const note = mockData.notes.find(note => note.id === id);
    note.content = dto.content;
    note.categoryName = dto.categoryName;
    return this.sendNote(note);
  }

  getNote(id: number) {
    return this.sendNote(mockData.notes.find(note => note.id === id));
  }

  getNotes() {
    return mockData.notes.map(note => this.sendNote(note));
  }

  getStats() {
    return mockData.categories.map(cat => {
      return {
        category: cat,
        notes: {
          active: mockData.notes.filter(note => note.categoryName === cat.name && !note.archived).length,
          archived: mockData.notes.filter(note => note.categoryName === cat.name && note.archived).length,
        }
      }
    });
  }

  sendNote(note) {
    return {
      id: note.id,
      created: note.created,
      content: note.content,
      category: mockData.categories.find(c => c.name === note.categoryName),
      archived: note.archived
    }
  }
}
