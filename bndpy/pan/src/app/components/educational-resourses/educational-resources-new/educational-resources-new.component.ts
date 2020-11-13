import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductEducationalSourceModel } from 'src/app/shared/models/product-educationalSource.model';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-educational-resources-new',
  templateUrl: './educational-resources-new.component.html',
  styleUrls: ['./educational-resources-new.component.css']
})
export class EducationalResourcesNewComponent implements OnInit {

  productEducationalSourceForm: FormGroup;
  productEducationalSources: ProductEducationalSourceModel[];
  educationalSourceId
  productId: string;
  filePath: string;
  editMode = false;
  imgURL: string | ArrayBuffer;
  iconURL: string | ArrayBuffer;
  private fileFile;
  private fileIcon;
  educationalSource: ProductEducationalSourceModel;
  message;

  constructor(private prService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.Getall();

  }
  Getall(){
    this.educationalSource = { _id: '', title: '', desc: '', file: '', icon: '', fileType: '' }
    this.route.params.subscribe((params: Params) => {

      this.productId = params.id;
      this.prService.getAllEducationalSources().subscribe((res:any) => {
        
        this.productEducationalSources = res;
      });
    });
  }
  onUploadFile(files) {
    if (files.length === 0) {
      return;
    }



    let reader = new FileReader();
    this.filePath = files;
    reader.readAsDataURL(files[0]);


    this.fileFile =files[0];

    this.productEducationalSourceForm.patchValue({ file: files[0].name })


    this.educationalSource.file = '';
  }


  onUploadIcon(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only files are supported.';
      return;
    }

    let reader = new FileReader();
    this.filePath = files;
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.iconURL = reader.result;
    }
    this.fileIcon = (files[0]);

    this.productEducationalSourceForm.patchValue({ icon: files[0].name })


    this.educationalSource.icon = '';
  }


  removeProducts(educationalSourceId) {


    this.prService.deleteProductEducationalSources(this.productId, educationalSourceId).subscribe((result) => {
      this.Getall();

    });

  }
  onNavigate() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onSubmit() {

    // 
    this.editMode==false?this.AddeducationalSources():this.EditeducationalSources();
    this.editMode=false;
  }
  EditeducationalSources(){

    this.prService.EditProductEducationalSources(this.productEducationalSourceForm.value, this.educationalSourceId, this.fileFile, this.fileIcon)
      .subscribe((result) => {
        console.log("result Edit")
          console.log(result)
        this.Getall();

        this.productEducationalSourceForm.reset();
      });

  }
  AddeducationalSources(){
    this.prService.addProductEducationalSources(this.productEducationalSourceForm.value, this.fileFile, this.fileIcon)
      .subscribe((result) => {
         
        this.Getall();

        this.productEducationalSourceForm.reset();
      });
  }
  private initForm() {

    this.productEducationalSourceForm = new FormGroup({

      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required),
      icon: new FormControl('', Validators.required),
      fileType: new FormControl('')
    });
  }

  private setData() {

    if (this.editMode) {




      //this.imgURL = env.assestUrl + this.educationalSource.file;
      console.log(this.imgURL);

      this.productEducationalSourceForm.setValue({
        title: this.educationalSource.title,
        desc: this.educationalSource.desc,
        fileType: this.educationalSource.fileType,
        file: this.educationalSource.file,
        icon: this.educationalSource.icon
      });

    }



  }
  Edit(educationalSource){
    this.editMode=true;
    console.log(educationalSource)
    this.educationalSourceId=educationalSource._id;
    this.productEducationalSourceForm.setValue({
      title: educationalSource.title,
      desc: educationalSource.desc,
      fileType: educationalSource.fileType,
      file: educationalSource.file,
      icon: educationalSource.icon
    });
  }
}
