import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TransportService } from 'src/app/services/transport.service';
import { TransportModel } from 'src/app/shared/models/transport.model';

@Component({
  selector: 'app-transport-edit',
  templateUrl: './transport-edit.component.html',
  styleUrls: ['./transport-edit.component.css']
})
export class TransportEditComponent implements OnInit {

  technology = { title: '', description: '',  price : ''};
  transports: TransportModel[];
  transportForm: FormGroup;
  editMode = false;
  imagePath;
  imgURL: any;
  message;
  id: string;
  private file;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private trService: TransportService
              ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params.id;
    this.initForm();


    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params.id;
          this.editMode = params.id != null;
          this.setData();
        }
      );

  }

  

  onBack(){
    if(this.editMode){
      this.router.navigate(['../../'], { relativeTo: this.route });
    }else{
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onSubmit() {
    console.log(this.transportForm)
    if (this.editMode) {

      this.trService.Edit(this.transportForm.value, this.id)
        .subscribe(
          (result) => {this.onBack() ; console.log(result)},
          (error) => console.log(error)
        );
    } else {
      this.trService.Add(this.transportForm.value)
        .subscribe(
          (result) => {this.onCancel(); console.log(result)},
          (error) => console.log(error)
        );
    }

  }

  onCancel() {
    this.transportForm.setValue({ title: '', description: '',price :'' });

  }

  setData() {

    if (this.editMode) {
      this.trService.GetById(this.id).subscribe((technology) => {

        this.technology = technology[0];
        this.transportForm.setValue({
          title: this.technology.title,
          description: this.technology.description,
          price: this.technology.price
        })
      })
    }

  }

  private initForm() {
    this.trService.GetAll().subscribe((transports) => this.transports =transports);
    this.transportForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }
}
