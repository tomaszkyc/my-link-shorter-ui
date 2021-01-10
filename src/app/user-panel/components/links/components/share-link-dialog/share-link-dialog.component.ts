import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ShareService} from "ngx-sharebuttons";

@Component({
  selector: 'app-share-link-dialog',
  templateUrl: './share-link-dialog.component.html',
  styleUrls: ['./share-link-dialog.component.scss']
})
export class ShareLinkDialogComponent implements OnInit {

  link: string = 'https://www.google.com';

  constructor(private dialogRef: MatDialogRef<ShareLinkDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private shareService: ShareService) { }

  ngOnInit(): void {
    this.link = this.data.shortLinkForExternalUse;
  }

  close() {
    this.dialogRef.close(null);
  }
}
