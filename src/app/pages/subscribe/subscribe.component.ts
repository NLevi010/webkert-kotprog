import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubscriptionService } from '../../shared/services/subscription.service';
import { Subscription } from '../../shared/models/Subscription';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Plan {
  value: string;
  view: string;
  description: string;
}

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  subForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    plan: new FormControl('', [Validators.required]),
  });
  plans: Plan[] = [
    { value: 'plan1', view: 'Csomag S', description: '100 perc vagy SMS belföldön. Keret elfogyása esetén: 35Ft/perc, 30Ft/SMS. 8GB mobilinternet.' },
    { value: 'plan2', view: 'Csomag L', description: '150 perc vagy SMS belföldön. Keret elfogyása esetén: 25Ft/perc, 20Ft/SMS. 15GB mobilinternet. Korlátlan mobilinternet használat egyes alkalmazásoknál.' },
    { value: 'plan3', view: 'Csomag XL', description: 'Korlátlan hívás vagy SMS belföldön és hálózaton belül. Hálózaton kívül: 10Ft/perc, 10Ft/SMS. 25GB mobilinternet. Korlátlan mobilinternet használat egyes alkalmazásoknál.' }
  ];
  selectedplan: Plan = this.plans[0];

  constructor(private actRoute: ActivatedRoute, private subscriptionService: SubscriptionService, private authService: AuthService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe({
      next: (param: any) => {
        let num = (param.selected as number) - 1;
        this.selectedplan = this.plans[num];
      }
    });
    this.subForm.get('plan')?.setValue(this.selectedplan);
  }

  onSubmit() {
    if (this.subForm.valid) {
      let sub: Subscription = {
        firstname: this.subForm.get('firstname')?.value,
        lastname: this.subForm.get('lastname')?.value,
        plan: this.subForm.get('plan')?.value.value,
        planName: this.subForm.get('plan')?.value.view,
        subscribedAt: new Date().toISOString().slice(0, 10),
        uid: this.authService.loggedInId() as string,
        id: ''
      }
      this.subscriptionService.create(sub).then(() => {
        let snackbarRef = this.snackbar.open('Sikeres előfizetés', 'Bezár', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 300,
        });
        snackbarRef.afterDismissed().subscribe({
          next: () => {
            this.router.navigateByUrl('/subscriptions');
          }
        });
      }).catch(error => {
        console.error(error);
        this.snackbar.open('Sikertelen előfizetés!', 'Bezár', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      });
    }
  }
}
