import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-link-dialog',
  templateUrl: './delete-link-dialog.component.html',
  styleUrls: ['./delete-link-dialog.component.scss']
})
export class DeleteLinkDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteLinkDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close(false);
  }

  deleteLink() {
    this.dialogRef.close(true);
  }
}
