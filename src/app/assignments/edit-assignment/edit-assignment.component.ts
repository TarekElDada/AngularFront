import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css', '../../../styles.css'],
})
export class EditAssignmentComponent implements OnInit{
  assignmentTransmis: Assignment | undefined;
  // Pour les champs de formulaire
  nomAssignment = '';
  dateDeRendu?: Date = undefined;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAssignment();
    console.log(this.assignmentTransmis);

    console.log("Query Params : ");
    console.log(this.route.snapshot.queryParams);
    console.log("Fragment : ");
    console.log(this.route.snapshot.fragment);
  }

  onSaveAssignment() {
    if (!this.assignmentTransmis) return;
    if (this.nomAssignment == '' || this.dateDeRendu === undefined) return;

    // on récupère les valeurs dans le formulaire
    this.assignmentTransmis.nom = this.nomAssignment;
    this.assignmentTransmis.dateDeRendu = this.dateDeRendu;
    this.assignmentsService
      .updateAssignment(this.assignmentTransmis)
      .subscribe((message) => {
        console.log(message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe(assignment => {
      this.assignmentTransmis = assignment;
      if (this.assignmentTransmis) {
        this.nomAssignment = this.assignmentTransmis.nom;
        this.dateDeRendu = this.assignmentTransmis.dateDeRendu;
      }
    });
  }
}
