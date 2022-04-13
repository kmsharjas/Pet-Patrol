import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  constructor(private route: Router, private userService: UserService) {}

  ngOnInit(): void {}

  logout() {
    this.userService.logout();
    this.route.navigate(['/']);
  }
}
