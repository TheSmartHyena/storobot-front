import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';

import { User } from './../../shared/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  currentUser: User = new User();

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {

    this.authService.getUserProfile(this.authService.getCurrentUserId()).subscribe(res => {
      this.currentUser = res.msg;
    })
  }

  ngOnInit() { }
}
