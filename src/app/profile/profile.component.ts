import { Component, OnInit } from '@angular/core';
import { CognitoService } from '../services/cognito.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
})
export class ProfileComponent implements OnInit {
  email: string = '';
  favoriteSport: string = '';

  constructor(private cognitoService: CognitoService) {}

  ngOnInit() {
    this.cognitoService.getUserAttributes()
      .then((attributes) => {
        const emailAttr = attributes.find((attr: any) => attr.Name === 'email');
        const favSportAttr = attributes.find((attr: any) => attr.Name === 'custom:favoritesport');

        if (emailAttr) {
          this.email = emailAttr.Value;
        }
        if (favSportAttr) {
          this.favoriteSport = favSportAttr.Value;
        }
      })
      .catch((err) => {
        console.log('Error fetching user attributes:', err);
      });
  }
}
