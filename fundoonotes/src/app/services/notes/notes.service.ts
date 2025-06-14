import { Injectable } from '@angular/core';
import { HttpService } from '../http_service/http.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpService) {}

  addNote(payload: any) {
    const headers = this.http.getHeader();
    return this.http.postApi('notes/addNotes', payload, headers);
  }

  getAllNotes() {
    const headers = this.http.getHeader();
    return this.http.getApi('notes/getNotesList', headers);
  }

  archiveNote(payload: any) {
    const headers = this.http.getHeader();
    return this.http.postApi('notes/archiveNotes', payload, headers);
  }

  getArchivedNotes() {
    const headers = this.http.getHeader();
    return this.http.getApi('notes/getArchiveNotesList', headers);
  }

  trashNote(payload: { noteIdList: string[]; isDeleted: boolean }) {
    const headers = this.http.getHeader();
    return this.http.postApi('notes/trashNotes', payload, headers);
  }

  getTrashedNotes() {
    const headers = this.http.getHeader();
    return this.http.getApi('notes/getTrashNotesList', headers);
  }

  changeNoteColor(payload: { color: string; noteIdList: string[] }) {
    const headers = this.http.getHeader();
    return this.http.postApi('notes/changesColorNotes', payload, headers);
  }

  deleteForever(payload: { noteIdList: string[] }) {
    const headers = this.http.getHeader();
    return this.http.postApi('notes/deleteForeverNotes', payload, headers);
  }

  updateNote(payload: {
    noteId: string;
    title: string;
    description: string;
    color: string;
  }) {
    const headers = this.http.getHeader();
    return this.http.postApi('notes/updateNotes', payload, headers);
  }

  pinUnpinNote(payload: { noteIdList: string[]; isPined: boolean }) {
    const headers = this.http.getHeader();
    return this.http.postApi('notes/pinUnpinNotes', payload, headers);
  }

  addReminder(payload: { noteIdList: string[]; reminder: string[] }) {
    const headers = this.http.getHeader();
    return this.http.postApi('notes/addUpdateReminderNotes', payload, headers);
  }

  getReminderNotes() {
    const headers = this.http.getHeader();
    return this.http.getApi('notes/getReminderNotesList', headers);
  }

  removeReminder(payload: { noteIdList: string[] }) {
    const headers = this.http.getHeader();
    return this.http.postApi('notes/removeReminderNotes', payload, headers);
  }
}
