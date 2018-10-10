import { Component, OnInit } from '@angular/core';
import { Taco } from '../taco.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TacosService } from '../tacos.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-taco-form',
  templateUrl: './taco-form.component.html',
  styleUrls: ['./taco-form.component.scss']
})
export class TacoFormComponent implements OnInit {
  taco: Taco;
  tacosForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tacosService: TacosService
  ) {
    this.tacosForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      ingredients: this.fb.array([this.fb.control('')]),
      steps: this.fb.array([this.fb.control('')]),
      tags: this.fb.array([this.fb.control('')])
    });
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.tacosService.getTaco(params.get('id'))
        )
      )
      .subscribe(
        (data: Taco) => {
          this.taco = data;
          this.populateForm(data);
        },
        error => console.log(error)
      );
  }

  private populateForm(data: Taco) {
    this.tacosForm.patchValue(data);
    this.tacosForm.setControl(
      'ingredients',
      this.fb.array(data.ingredients || [])
    );
    this.tacosForm.setControl('steps', this.fb.array(data.steps || []));
    this.tacosForm.setControl('tags', this.fb.array(data.tags || []));
  }

  get ingredients() {
    return this.tacosForm.get('ingredients') as FormArray;
  }

  get steps() {
    return this.tacosForm.get('steps') as FormArray;
  }

  get tags() {
    return this.tacosForm.get('tags') as FormArray;
  }

  cancel() {
    if (this.taco._id) {
      this.router.navigate(['/tacos', this.taco._id]);
    } else {
      this.router.navigate(['/tacos']);
    }
  }

  onSubmit() {
    const newTaco = this.tacosForm.value;
    if (this.taco._id) {
      newTaco._id = this.taco._id;
      this.tacosService.updateTaco(newTaco).subscribe(
        result => {
          this.taco = result;
          this.populateForm(result);
        },
        error => console.log(error)
      );
    } else {
      this.tacosService.addTaco(newTaco).subscribe(
        result => {
          this.taco = result;
          this.populateForm(result);
        },
        error => console.log(error)
      );
    }
  }
}
