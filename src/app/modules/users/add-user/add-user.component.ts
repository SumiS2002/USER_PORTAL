import { Component, OnInit } from '@angular/core';
import { userModel } from '../users.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user:userModel = {}
  allusers:any = []
  constructor(private api:ApiService,private router:Router){}
  ngOnInit():void{
    this.api.getAllUsersAPI().subscribe((result)=>{
      // console.log(result);
      this.allusers=result
       
    })

    
  }
  addUser(){
    const existingUser = this.allusers.find((item:any)=>item.id==this.user.id)
    if(existingUser){
      alert("Id already exist!!! Use unique id to add user")
    }else{
      this.api.saveUserAPI(this.user).subscribe({
        next:(result:any)=>{
          console.log(result);
          alert(`${result.name} has added to our DB`)
           this.router.navigateByUrl('/users')
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }

  }
  
  cancel(){
    this.user={}
    // this.user.id=""
    // this.user.name=""
    // this.user.email=""
    // this.user.status=""
  }

}
