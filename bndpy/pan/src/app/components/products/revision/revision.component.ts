import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { RevisionModel } from 'src/app/shared/models/Revision.model';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.css']
})
export class RevisionComponent implements OnInit {

  revisions:RevisionModel
  productId
  constructor(
    private prService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
    
    mainTitle:string;
    description:string;
    details=[]
    title:string;
    image:string;
    desc:string;
    imageURL: string | ArrayBuffer;
    private fileimage;
    filePath: string;
    mode=false;

  ngOnInit() {


    this.route.params.subscribe((params: Params) => {
      this.productId = params.id;
      this.getById()
    });
  }
  getById(){
    this.prService.getById(this.productId).subscribe((product) => {
      // debugger
      product[0].revision.mainTitle?this.mode=true:this.mode=false;
      this.revisions = product[0].revision;
      this.mainTitle=this.revisions.mainTitle
      this.description=this.revisions.description
      this.details=this.revisions.deatils;
      console.log(product)
    });
  }
  submitDetail(){
    const Revision={
      'title':this.title,
      'desc':this.desc,
      'image':this.image
    }
    this.prService.AddRevisionDetail(Revision,this.productId,this.fileimage).subscribe(res=>{

      this.revisions = res['product']['revision'];
      this.mainTitle=this.revisions.mainTitle
      this.description=this.revisions.description
      this.details=this.revisions.deatils;
    })
  }
  submitRevision(){
    // debugger
    
    if(!this.mode){
      const Revision={
        'mainTitle':this.mainTitle,
        'description':this.description,
        'title':this.title,
        'desc':this.desc,
        'image':this.image
      }
      this.prService.AddRevision(Revision,this.fileimage,this.productId).subscribe(res=>{
        this.revisions = res['product']['revision'];
        this.mainTitle=this.revisions.mainTitle
        this.description=this.revisions.description
        this.details=this.revisions.deatils;
      })
    }else{
      const Revision={
        'mainTitle':this.mainTitle,
        'description':this.description
      }
      
      this.prService.UpdateRevision(Revision,this.productId).subscribe(res=>{
        console.log(res);
      })
    }
    
    
    
  }
  
  
  removeDetail(id){
    this.prService.DeleteRevissionDetail(id).subscribe(res=>{
      console.log(res);
      this.getById()
    })
  }


  onUploadimage(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {

      return;
    }

    let reader = new FileReader();
    this.filePath = files;
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.imageURL = reader.result;
    }
    this.fileimage = (files[0]);

    this.image= files[0].name ;

  }
}
