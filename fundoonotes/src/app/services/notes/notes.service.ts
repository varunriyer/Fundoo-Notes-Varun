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
}
