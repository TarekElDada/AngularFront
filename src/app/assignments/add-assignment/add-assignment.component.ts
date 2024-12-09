import { Component, inject, /*EventEmitter, Output, */OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../../shared/rendu.directive';
import { NonRenduDirective } from '../../shared/non-rendu.directive';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Assignment } from '../assignment.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssignmentDetailComponent } from '../assignment-detail/assignment-detail.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [CommonModule, RenduDirective, NonRenduDirective, FormsModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatIconModule, AssignmentDetailComponent, MatDividerModule, MatListModule],
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css', '../../../styles.css']
})
export class AddAssignmentComponent implements OnInit {
  // @Output() nouvelAssignment = new EventEmitter<Assignment>();
  titre = "Mes assignements";
  ajoutActive = false;
  id = Math.floor(Math.random() * 100000);
  nomDevoir: string = "";
  selectedDate: Date = new Date();
  snackBar = inject(MatSnackBar);

  constructor(private assignmentsService: AssignmentsService, private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.ajoutActive = true;
    }, 2000);
  }

  onSubmit() {
    const newAssignement = new Assignment();

    // On récupère automatiquement l'id le plus grand et on incrémente de 1
    this.assignmentsService.getAssignments().subscribe((assignments: Assignment[]) => {
      newAssignement.id = this.id;
      newAssignement.nom = this.nomDevoir;
      newAssignement.dateDeRendu = this.selectedDate;
      newAssignement.rendu = false;

      // this.nouvelAssignment.emit(newAssignement);
      this.assignmentsService.addAssignment(newAssignement).subscribe();
      // Simple message.
      this.snackBar.open("L'assignement a été ajouté", "Fermer");
      this.router.navigate(['/home']);
    });
  }

  onDateChange(newDate: Date) {
    const formattedDate = newDate.toISOString().split('T')[0];
    this.selectedDate = new Date(formattedDate);
    console.log('Date changed:', this.selectedDate);
  }
}