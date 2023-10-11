import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from './service/users.service';

import { MatPaginator } from '@angular/material/paginator';
import { User } from './interface/user';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[] = [];
  public usersLength: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UsersService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getAllUsers();
  }

  private getAllUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.displayedColumns = [...this.getDynamicColumns(data), 'Actions'];
      this.dataSource = new MatTableDataSource(data);
      this.usersLength = this.dataSource.filteredData.length;
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.error(error);
    });
  }

  private getDynamicColumns(data: any[]): string[] {
    if (data.length === 0) {
      return [];
    }
    return Object.keys(data[0]);
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(data => {
      this.getAllUsers();
    }, error => {
      console.error(error);
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '450px',
      data: { user, editMode: true },
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result && user.id) {
        this.userService.updateUser(user.id, result).subscribe(data => {
          this.getAllUsers();
        }, error => {
          console.error(error);
        });
      }
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '450px',
      data: {
        user: {},
        editMode: false
      },
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        this.userService.postUser(result).subscribe(data => {
          this.getAllUsers();
        }, error => {
          console.error(error);
        });
      }
    });
  }

}
