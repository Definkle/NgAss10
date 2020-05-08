import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  projectStatus = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;
  forbiddenProjectNames = ['test'];
  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectData': new FormGroup({
        'name': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)], this.asyncForbiddenNames),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'status': new FormControl('Stable')
      })
    });
  }

  onSubmit() {
    console.log(this.projectForm);
  }
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }
  asyncForbiddenNames(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({ 'nameIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1);
    });
    return promise;
  }
}
