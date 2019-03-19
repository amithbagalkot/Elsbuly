import { Component, OnInit } from '@angular/core';
import { CountryCodeService } from '../../../services/countryCode.service';
import { RequestSenderService } from '../../../services/request-sender.service';
import { ApiConfig, UrlConfig } from '../../../config/index';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RegisterAction } from '../../../actions/register.action';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../stores';
import { Md5 } from 'ts-md5';
import { RegisterService } from '../../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegistrationComponent implements OnInit {
  otp_num_1;
  countryName: String;
  telephoneCode;
  countryList: any;
  countryData: any;
  CountryDetails: any;
  CountryCode: String;
  RegPhoneNum: any;
  regemail: any;
  countrydetails: any;
  countryDial: boolean = false;
  user_type_selection: boolean = true;
  public CountryCodeNumber: any;
  regPhone: boolean = false;
  registerOtp: boolean;
  regEmail: boolean = false;
  phoneNumber: any;
  regpass: any;
  show: boolean;
  passwordsnotmatch: boolean = false;
  PhoneForm: FormGroup;
  EmailForm: FormGroup;
  PasswordForm: FormGroup;
  RePasswordForm: FormGroup;
  verfiyOTP: FormGroup;
  regPassword: boolean = false;
  regRePass: boolean = false;
  regInfo: boolean = false;
  user_type_id: string;
  otpForm;
  otpCode;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern = "^(?=.*[0-9])(?=.*[A-Z!#$%^&*])(?!.*\s).{8,10}$";
  constructor(private toastr: ToastsManager, private fb: FormBuilder,
    private router: Router, private countrycodeservice: CountryCodeService,
    private requestsenderservice: RequestSenderService, private ngRedux: NgRedux<IAppState>,
    private registerAction: RegisterAction, private registerService: RegisterService) {
    this.show = false;
    this.PhoneForm = this.fb.group({
      RegPhoneNum: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
      CountryDetails: ['']
    });
    this.otpForm = this.fb.group({
      otpCode: ['', Validators.required]
    });

    this.EmailForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])]
    });

    this.PasswordForm = this.fb.group({
      pass: ['', Validators.compose([Validators.required])]
      //, Validators.pattern(this.passwordPattern)
    });
    this.RePasswordForm = this.fb.group({
      regRePass: ['']
    });

    this.verfiyOTP = this.fb.group({
      otp_num_1: [''],
      otp_num_2: [''],
      otp_num_3: [''],
      otp_num_4: [''],
      otp_num_5: [''],
      otp_num_6: ['']
    });
  }
  onkey(event, nextInput) {
    let input = event.target;
    let length = input.value.length;
    let maxlength = input.attributes.maxlength.value;
    if (length = maxlength) {
      nextInput.focus();
    }
  }
  ngOnInit() {
    this.countryData = this.countrycodeservice.getCountryCode();
    this.registerOtp = true;
  }

  registeras(event) {
    this.user_type_selection = false;
    if (event.target.value == 'advisor') {
      this.user_type_id = 'ADVISOR';
    }
    if (event.target.value === 'trader') {
      this.user_type_id = 'TRADER';
    }
  }
  country() {
    this.countrydetails = this.PhoneForm.value.CountryDetails
    var n = this.PhoneForm.value.CountryDetails.indexOf("+");
    this.CountryCode = this.PhoneForm.value.CountryDetails.substring(n);
    if (typeof this.CountryCode == "string") {
      this.countryDial = true;
    }
  }
  CountryPhoneNumber() {   // createOtp
    this.phoneNumber = this.PhoneForm.value.RegPhoneNum;

    this.CountryCodeNumber = this.CountryCode + this.PhoneForm.value.RegPhoneNum;
    const RequestObject = {
      method: "POST",
      path: ApiConfig.MOBILE_OTP,
      body: { 
        mobilenumber: this.CountryCodeNumber,
        countryCode: this.CountryCode
      },
    }
    this.requestsenderservice.send(RequestObject).subscribe(res => {

      if(res.data.code === "MOBILE_NUMBER_EXIST"){
        this.toastr.error(res.data.message);
      };
      if(res.data.code !== "MOBILE_NUMBER_EXIST"){
        this.toastr.success(res.data.message);
        this.registerOtp = false;
        this.regPhone = true;
      };
      // if (res.data == "mobilenumber is already existed in bs_user db") {
      //   this.toastr.error("mobilenumber is already existed");
      // }
      // if (res.data !== "mobilenumber is already existed in bs_user db") {
      //   this.toastr.success(res.data);
      //   this.registerOtp = true;
      //   this.regPhone = true;
      // }
    }, err => {
      this.toastr.error("getting error in generating the otp")
    })
    this.CountryCodeNumber = this.CountryCode + this.phoneNumber;
    this.countrycodeservice.getNumber(this.CountryCodeNumber);
  }

  resendOtp() {
    const RequestObject = {
      method: "POST",
      path: ApiConfig.RESEND_OTP,
      body: {   
        mobilenumber: this.CountryCodeNumber,
        countryCode: this.CountryCode
       },
    }
    setTimeout(() => {
      this.verfiyOTP.reset();
    }, 3000);
    this.requestsenderservice.send(RequestObject).subscribe(res => {
      this.toastr.success("Otp sent ")
    }, errObj => {
      this.toastr.error("getting error in regenerating the otp")
    })
  };

  verifyOtp() {
    var otp = this.verfiyOTP.value.otp_num_1 + this.verfiyOTP.value.otp_num_2 + this.verfiyOTP.value.otp_num_3 + this.verfiyOTP.value.otp_num_4 + this.verfiyOTP.value.otp_num_5 + this.verfiyOTP.value.otp_num_6;
    const RequestObject = {
      method: "POST",
      path: ApiConfig.VERIFY_OTP,
      body: { mobilenumber: this.CountryCodeNumber, otp: otp },
    }
    this.requestsenderservice.send(RequestObject).subscribe(res => {
     if(res.data.msg === 'otp is not matched') {
        this.toastr.error('otp is not matched');
     }
     else {
      this.toastr.success('otp is matched');
      this.regEmail = !this.regEmail;
      this.registerOtp = true;
     }
      
    }, errObj => {
      this.toastr.error(errObj.error.data.msg)
    });
  }

  registerEmail() {
    this.regemail = this.EmailForm.value.email
    this.regEmail = !this.regEmail;
    this.regPassword = true;
  }
  registerPassword() {
    this.regpass = this.PasswordForm.value.pass;
    this.regPassword = false;
    this.regRePass = true;
    this.show = false;
  }
  registerRePass() {
    
    this.telephoneCode = this.CountryCode.split('+');
    if (this.regpass !== this.RePasswordForm.value.regRePass) {
      this.toastr.error("Passwords are not matched")
      this.passwordsnotmatch = true
    }

   
    else if (this.regpass == this.RePasswordForm.value.regRePass) {
      const userObj = {
        coutry_id: this.telephoneCode[1],
        telephone: this.CountryCodeNumber,
        user_name: null, 
        password: this.regpass, 
        email_id: this.regemail,
        gender_id: 10301,
        user_type_id: this.user_type_id,
        user_source_code: 'ANDROID',
        idea_push_preference_id: 70101,
        record_status_id: 10101
      }
      this.registerService.registerUser(userObj).subscribe(res => {
        if (res.meta.statusCode === 201) {
          this.toastr.success(res.meta.message.message);
          this.regRePass = false;
          this.regInfo = true;
        }
      }, errObj => {
        this.toastr.error(errObj.error.data.msg)
      });
    }
  }

  registerInfo() {
    this.router.navigateByUrl(UrlConfig.LOGIN);
  }

  showPassword() {
    this.show = !this.show;
  }
}