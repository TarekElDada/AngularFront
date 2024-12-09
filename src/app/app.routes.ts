import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { loginGuard } from './shared/login.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', component: AssignmentsComponent, canActivate: [loginGuard] },
    { path: 'home', component: AssignmentsComponent, canActivate: [loginGuard]  },
    { path: 'add', component: AddAssignmentComponent, canActivate: [loginGuard]  },
    { path: 'assignment/:id', component: AssignmentDetailComponent, canActivate: [loginGuard]  },
    { path: 'assignment/:id/edit', component: EditAssignmentComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
];
