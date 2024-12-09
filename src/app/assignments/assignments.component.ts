import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';
import { NonRenduDirective } from '../shared/non-rendu.directive';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Assignment } from './assignment.model';
import { OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentsService } from '../shared/assignments.service';
import { Observable, of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RenduDirective, NonRenduDirective, FormsModule, MatButtonModule, MatInputModule, MatNativeDateModule, MatFormFieldModule, MatIconModule, AssignmentDetailComponent, MatDividerModule, MatListModule, AddAssignmentComponent, MatCardModule, MatPaginatorModule],
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css', '../../styles.css']
})
export class AssignmentsComponent implements OnInit {
  titre = "Liste des devoirs";
  formVisible = false;
  ajoutActive = false;
  nomDevoir: string = "";
  snackBar = inject(MatSnackBar);
  assignmentSelectionne!: Assignment;
  assignments: Assignment[] = [];

  page:number = 1;
  limit:number = 10;
  totalDocs!:number;
  totalPages!:number;
  nextPage!:number;
  prevPage!:number;
  hasPrevPage!:boolean;
  hasNextPage!:boolean;

  constructor(private assigmentsService: AssignmentsService) { }

  ngOnInit(): void {
    this.getAssignmentsPagine();
    setTimeout(() => {
      this.ajoutActive = true;
    }, 2000);
  }

  getAssignmentsPagine() {
    this.assigmentsService.getAssignmentPagine(this.page, this.limit).subscribe(data => {
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
      console.log("Données reçues")
    });
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignmentsPagine();
  }

  onSubmit() {
    const newAssignement = new Assignment();
    newAssignement.id = this.assignments.length > 0 ? Math.max(...this.assignments.map(a => a.id)) + 1 : 1;
    newAssignement.nom = this.nomDevoir;
    newAssignement.rendu = false;

    this.assignments.push(newAssignement);
    // Simple message.
    this.snackBar.open("L'assignement a été ajouté", "Fermer");
  }

  assignmentClique(assignement: Assignment) {
    this.assignmentSelectionne = assignement;
  }

  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }

  // onNouvelAssignment(event: Assignment) {
  //   this.assigmentsService.addAssignment(event).subscribe();
  //   this.formVisible = false;
  // }

  getAssignments() {
    this.assigmentsService.getAssignments().subscribe(assignments => this.assignments = assignments);
  }
}