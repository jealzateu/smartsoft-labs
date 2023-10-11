import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../interface/user';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    gender: '',
    status: ''
  };
  genderOptions: string[] = ['male', 'female'];
  statusOptions: string[] = ['active', 'inactive'];
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, editMode: boolean },
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.editMode) {
      this.user = { ...this.data.user };
    }
    this.initializeForm();
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      gender: [this.user.gender, Validators.required],
      status: [this.user.status, Validators.required],
    });
  }

  onSaveClick() {
    this.dialogRef.close(this.userForm.value);
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
