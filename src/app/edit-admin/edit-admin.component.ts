import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminAPIService } from '../adminAPIServices/admin-api.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
 @Output() onAdminChange = new EventEmitter()
  editAdminStatus:boolean = false
  adminDetails:any = {}
  adminProfile:string = 'https://icon2.cleanpng.com/20180920/att/kisspng-user-logo-information-service-design-5ba34f886b6700.1362345615374293844399.jpg'

  constructor(private adminAPI:AdminAPIService){}
  ngOnInit(): void {
    this.adminAPI.getAdminDetails().subscribe((result:any)=>{
      this.adminDetails = result
      if(result.picture){
        this.adminProfile = result.picture
      }
    })
  }


  editAdminBtn(){
    this.editAdminStatus = true
  }

  cancel(){
    this.editAdminStatus = false
  }

  getFile(event:any){
    let uploadFile = event.target.files[0]
    // this.adminProfile = URL.createObjectURL(uploadFile)
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event:any)=>{
      this.adminProfile = event.target.result
      this.adminDetails.picture = this.adminProfile
    }
    // this.adminDetails.picture = this.adminProfile
    console.log(this.adminDetails);
    
  }

  updateAdmin(){
    this.adminAPI.updateAdminDetails(this.adminDetails).subscribe({
      next:(result:any)=>{
        this.editAdminStatus = false
        alert("Updated successfully...")
        sessionStorage.setItem("adminDetails",JSON.stringify(result))
        this.onAdminChange.emit(result.name)
      },
      error:(reason:any)=>{
        console.log(reason);
        alert("Updation Falid Please come later....")
        
      }

    })
  }

}
