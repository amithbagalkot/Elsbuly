import { Component, ElementRef, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../stores';
import { RegisterService } from '../../../services/register.service';
import { ApiConfig } from '../../../config';
import { RequestSenderService } from '../../../services/request-sender.service';
import { Observable } from 'rxjs';
import { ToastsManager } from 'ng2-toastr';
import { MapsAPILoader } from '@agm/core';
import { AdvisorActions } from '../../../actions/advisor.actions';
import { LoginActions } from '../../../actions/authLogin.actions';
//import 'rxjs/add/operator/map';
//import {} from 'googlemaps';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isReadonly: boolean = true;
  userProfile: any;
  userDetails: any;
  user_name: string;
  displayName: string;
  gender: object = [{ name: 'Male', id: 10301 }, { name: 'Female', id: 10302 }];
  gender_id;
  gender_id_u: any;
  email_id: string;
  telephone: any;
  filesToUpload: Array<File>;
  toggle;
  fileName;
  image_name;
  url: any;
  usercheckname;
  defaultImage: any;
  show_userDetails: boolean = false;


  first_name: string;
  middle_name: string;
  last_name: string;
  location: string;
  dateOfBirth: any;
  _gender: string;
  userProfile_storage;


  obj = {
    edit: 'Edit',
    cancel: 'Cancel'
  }
  error: boolean;
  dispalyError: any;
  //@ViewChild("search") public searchElementRef: ElementRef;

  constructor(private fb: FormBuilder, private toastr: ToastsManager, private mapsApiLoader: MapsAPILoader,
    private ngRedux: NgRedux<IAppState>, private requestService: RequestSenderService, private advisoraction: AdvisorActions,
    private registerService: RegisterService, private ngzone: NgZone, 
    private loginAction: LoginActions) {
    this.url = 'https://devserver.elsbuly.com:3000/';
    this.userDetails = JSON.parse(localStorage.getItem('state')).auth.userinfo;
    this.userProfile_storage = JSON.parse(localStorage.getItem('user_profile'));

    this.displayName = this.userDetails.user_name;
    this.email_id = this.userDetails.email_id;
    this.telephone = this.userDetails.telephone;
    this.middle_name = this.userDetails.middle_name;
    this.first_name = this.userDetails.first_name;
    this.last_name =  this.userDetails.last_name;
    this.location =  this.userDetails.location;
    this.dateOfBirth = this.userDetails.date_of_birth;

   if(this.userDetails.first_name && this.userDetails.middle_name !== null && this.last_name) {

    this.show_userDetails = true;
   }
    if(this.userDetails.gender_id === 10301 ) {
      this._gender = 'male'
    }
    else {
      this._gender = 'female'
    }


    this.filesToUpload = [];
    this.toggle = this.obj.edit;
    this.usercheckname = "^[a-zA-z ]{2,15}$";
    this.user_name = this.userDetails.user_name;

    this.userProfile = this.fb.group({
      firstName: [null, Validators.compose([Validators.pattern(this.usercheckname)])],
      middleName: [null],
      lastName: [null],
      email: [null],
      phoneNumber: [null],
      date_of_birth: [null],
      gender: [null],
      location: [null]
    })
    this.userProfile.valueChanges.subscribe((res) => {
      // this.mapsApiLoader.load().then(
      //   ()=>{
      //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      //     autocomplete.addListener('places_changed', ()=>{
      //       this.ngzone.run(()=>{
      //         let place : google.maps.places.PlaceResult = autocomplete.getPlace();
      //       })
      //     });
      //   }
      // )
    })
  }

  ngOnInit() {
    // this.advisoraction.getAdvisors();
    // this.ngRedux.subscribe(()=>{
    //   var state = this.ngRedux.getState();
    // })
    console.log(this.userDetails.gender_id);
    this.registerService.getImage().subscribe((res) => {
      if (res.meta.statusCode = 203) {
        this.image_name = "default.png";
      }
      else {
        this.image_name = res.data.image_name;
      }
    }, err => {
      console.log(err);
    });

    if(this.userProfile_storage.firstName !== null && this.userProfile_storage.middleName  && this.userProfile_storage.lastName) {
      this.show_userDetails = true;
      this.userProfile_storage = JSON.parse(localStorage.getItem('user_profile'));
      this.middle_name = this.userProfile_storage.middleName || this.userDetails.middle_name;
      this.first_name = this.userProfile_storage.firstName || this.userDetails.first_name;
      this.last_name = this.userProfile_storage.lastName || this.userDetails.last_name;
      this.location = this.userProfile_storage.location || this.userDetails.location;
      this.dateOfBirth = this.userProfile_storage.date_of_birth || this.userDetails.date_of_birth;
     }
  }

  async submitDetails(event) {
    if (this.userProfile.value.gender || this.userDetails.gender_id === 'male' || 10301) {
      this.gender_id_u = this.gender[0].id;
      this._gender = this.userProfile.value.gender;
    }
    // if (this.userProfile.value.gender || this.userDetails.gender_id === 'female' || 10302) {
    //   console.log('female');
    //   this.gender_id_u = this.gender[1].id;
    //   this._gender = this.userProfile.value.gender;
    // }


    const birthdate = new Date(this.userProfile.value.date_of_birth);
    const userObj = {
      user_id: this.userDetails.user_id,
      coutry_id: this.userDetails.country_id,
      telephone: this.userProfile.value.phoneNumber || this.userDetails.telephone,
      user_name: this.user_name,
      password: "demo",
      email_id: this.userProfile.value.email || this.userDetails.email_id,
      gender_id: this.gender_id_u || this.gender_id,
      user_type_id: this.userDetails.user_type_id,
      user_source_code: 'ANDROID',
      idea_push_preference_id: this.userDetails.idea_push_preference_id,
      record_status_id: this.userDetails.record_status_id,
      firstName: this.userProfile.value.firstName ||this.userDetails.first_name,
      lastName: this.userProfile.value.lastName || this.userDetails.last_name,
      middleName: this.userProfile.value.middleName || this.userDetails.middle_name,
      date_of_birth: this.userProfile.value.date_of_birth || this.userDetails.date_of_birth,
      location: this.userProfile.value.location || this.userDetails.location
    }

    localStorage.setItem('user_profile', JSON.stringify(userObj));
    this.userProfile_storage = JSON.parse(localStorage.getItem('user_profile'));
    this.middle_name = this.userProfile.value.middleName || this.userProfile_storage.middleName 
    this.first_name =  this.userProfile.value.firstName|| this.userProfile_storage.firstName 
    this.last_name =  this.userProfile.value.lastName  || this.userProfile_storage.lastName 
    this.location =  this.userProfile.value.location ||  this.userProfile_storage.location
    this.dateOfBirth =  this.userDetails.date_of_birth || this.userProfile_storage.date_of_birth;
    this._gender = this.userProfile.value.gender;
    if(this.userProfile_storage.firstName && this.userProfile_storage.middleName  && this.userProfile_storage.lastName) {

      this.show_userDetails = true;
     }

    await this.registerService.updateUser(userObj).subscribe((res) => {
      if (res.meta.statusCode == 201) {
        this.toastr.success(res.meta.message.message);
      }
    }, (err) => {
      console.log(err);
    });
    this.userProfile.reset();
  }


  edit() {
    if (this.toggle === 'Edit') {
      this.toggle = this.obj.cancel;
    }
    else {
      this.toggle = this.obj.edit;
    }
    this.isReadonly = !this.isReadonly;
  }

  async uploadImage(event) {

    const userObj = {
      user_id: this.userDetails.user_id,
      coutry_id: this.userDetails.country_id,
      telephone:  this.userProfile_storage.telephone|| this.userDetails.telephone,
      user_name: this.user_name,
      password: "demo",
      email_id:  this.userProfile_storage.email_id || this.userDetails.email_id,
      gender_id: this.gender_id_u || this.gender_id,
      user_type_id: this.userDetails.user_type_id,
      user_source_code: 'ANDROID',
      idea_push_preference_id: this.userDetails.idea_push_preference_id,
      record_status_id: this.userDetails.record_status_id,
      firstName: this.userProfile_storage.firstName || this.userDetails.first_name,
      lastName: this.userProfile_storage.lastName || this.userDetails.last_name,
      middleName:   this.userProfile_storage.middleName || this.userDetails.middle_name,
      date_of_birth:  this.userDetails.date_of_birth,
      location:  this.userProfile_storage.location || this.userDetails.location
    }
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    const uploadData = new FormData();

    uploadData.append('profileImage', file, file.name);
    await this.registerService.uploadImage(uploadData).subscribe((res) => {
      if (res.meta.statusCode = 201) {
        this.image_name = res.data.image_name
      }
    }, (err) => {
      if (err.error.meta.statusCode = 500) {
        this.error = true;
        this.dispalyError = err.error.data.msg;
        this.toastr.error(err.error.data.msg);
        setTimeout(() => {
          this.error = false;
        }, 5000)
      }
    });
  }
  // getLocation(event){
  //   this.registerService.getLocation(event.target.value).subscribe((res)=>{
  //     console.log("this is our location results in user_profile"+res);
  //   })
  // }

  editUserDetails() {
    if (this.toggle === 'Edit') {
     // this.show_userDetails = false;
      this.toggle = this.obj.cancel;
    }
    else {
     // this.show_userDetails = true;
      this.toggle = this.obj.edit;
    }
    this.isReadonly = !this.isReadonly;
   
  }
}