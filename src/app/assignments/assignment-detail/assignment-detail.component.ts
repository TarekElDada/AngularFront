import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router, ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';


@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatButtonModule, RouterOutlet, RouterLink],
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css', '../../../styles.css']
})
export class AssignmentDetailComponent implements OnInit {
  /*@Input()*/ assignmentTransmis!: Assignment | undefined;

  constructor(private assignmentsService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
  }
  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;
      this.assignmentsService.updateAssignment(this.assignmentTransmis).subscribe(m => this.router.navigate(['/home']));

    }
  }

  onDelete() {
    if (this.assignmentTransmis) {
      this.assignmentsService.deleteAssignment(this.assignmentTransmis.id).subscribe(m =>
        this.router.navigate(['/home']));
    }
  }

  onClickEdit() {
    if (this.assignmentTransmis) {
      this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'], { queryParams: { nom: this.assignmentTransmis.nom }, fragment: 'edition' });
    }
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe(assignment => this.assignmentTransmis = assignment);
  }

  isAdmin() {
    return this.authService.currentUser?.role === 'admin';
  }
}
