import { Component, OnInit } from '@angular/core';
import { Taco } from '../taco.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TacosService } from '../tacos.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-taco-detail',
  templateUrl: './taco-detail.component.html',
  styleUrls: ['./taco-detail.component.scss']
})
export class TacoDetailComponent implements OnInit {
  taco: Taco;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tacosService: TacosService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.tacosService.getTaco(params.get('id'))
        )
      )
      .subscribe((data: Taco) => (this.taco = data));
  }

  goBack() {
    this.router.navigate(['/tacos']);
  }

  edit() {
    this.router.navigate(['/tacos/edit', this.taco._id]);
  }
}
