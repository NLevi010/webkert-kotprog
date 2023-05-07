import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from '../../shared/models/Subscription';
import { SubscriptionService } from '../../shared/services/subscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  subscriptions: Subscription[] | any;

  constructor(
    private subService: SubscriptionService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.subService.getAll(this.authService.loggedInId() as string).subscribe({
      next: (subs) => {
        this.subscriptions = subs;
      }
    });
  }

  delete(id: string) {
    const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: 'Biztosan lemondod?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subService.delete(id).then(() => {
          const successDialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, {
            width: '300px',
            data: 'Sikeresen lemondva'
          });
          successDialogRef.componentInstance.showButtons = false;
        });
      }
    });
  }
}
