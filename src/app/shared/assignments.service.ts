import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { data } from './data';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  backendURL = "https://apicoursangular.onrender.com";
  constructor(private loggingService: LoggingService, private http: HttpClient) { }

  getAssignments(): Observable<any> {
    return this.http.get<any>(this.backendURL);
  }

  getAssignment(id: number): Observable<any> {
    return this.http.get<any>(this.backendURL + '/' + id);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put<Assignment>(this.backendURL, assignment);
  }

  deleteAssignment(id: number) {
    return this.http.delete<Assignment>(this.backendURL + '/' + id);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    return this.http.post<Assignment>(this.backendURL, assignment);
  }

  peuplerBDavecForkJoin(): Observable<any> {
    let appelsVersAddAssignment: Observable<any>[] = [];

    data.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.id = Math.floor(Math.random() * 100000);
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment))
    });

    return forkJoin(appelsVersAddAssignment);
  }

  getAssignmentPagine(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.backendURL}?page=${page}&limit=${limit}`);
  }
}
