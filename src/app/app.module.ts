import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { EmployeeService } from './services/employee.service';
import { TeamService } from './services/team.service';
import { TeamTableComponent } from './team-table/team-table.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamTableComponent,
    EmployeeTableComponent,
    EmployeeDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
  ],
  providers: [EmployeeService, TeamService],
  bootstrap: [AppComponent],
})
export class AppModule {}
