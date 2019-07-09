import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {RegisterService} from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService:RegisterService, private builder:FormBuilder) { }
  
  RegisterForm:FormGroup = this.builder.group({
    Name:new FormControl (),
    Username: new FormControl(),
    Password: new FormControl()
  })

  registerSave(){
    console.log(this.RegisterForm.value);
    this.registerService.saveRegisterData(this.RegisterForm.value)
    .subscribe(data =>{
      console.log(this.RegisterForm.value); 
    })

  }

  ngOnInit() {
  }

}
