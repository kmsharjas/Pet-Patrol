import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnimalCategory } from 'src/app/models/navCategory.model';
import { MainService } from 'src/app/services/main.service';
import { MiscService } from 'src/app/services/misc.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  baseUrl = environment.apiBaseUrl;
  newsletter: string;
  animalCategory: AnimalCategory[] = [];
  dogCategory: any;
  catCategory: any;
  constructor(
    private http: HttpClient,
    private miscService: MiscService,
    private mainservices: MainService
  ) {}
  ngOnInit(): void {
    this.mainservices.getNavList().subscribe((res) => {
      console.log(res);
      this.animalCategory = res;
      this.dogCategory = this.animalCategory.find((x) => x.animal === 'Dog').id;
      this.catCategory = this.animalCategory.find((x) => x.animal === 'Cat').id;
    });

    this.http.post(this.baseUrl + '/addemail', { email: 'val' });
  }

  onSubscribe(val) {
    console.log(val);

    this.miscService.newsletter({ email: val }).subscribe((res) => {
      console.log(res);
      if (res === 'added succesfully') alert('Subscribed Successfully');
      this.newsletter = '';
      //  this.distributorForm.reset();
    });
  }
  a() {
    console.log(this.dogCategory, this.catCategory);
  }
}
