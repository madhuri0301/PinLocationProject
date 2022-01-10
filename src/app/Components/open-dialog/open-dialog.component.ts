import { HttpClient } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import * as L from 'leaflet';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';

@Component({
  selector: 'app-open-dialog',
  templateUrl: './open-dialog.component.html',
  styleUrls: ['./open-dialog.component.scss']
})
export class OpenDialogComponent implements OnInit {
  createNotesForm!: FormGroup;
  input_description = '';
  display = true;
  data = [];
  latitude: any;
  latlng: any;
  address:any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dataService: DataServiceService) { }

  ngOnInit(): void {

    this.createNotesForm = this.formBuilder.group({
      description: [''],
    })
    this.dataService.receiveData.subscribe(
      (Latlong: any) => {
        console.log(Latlong);
        this.latlng = Latlong
      })
    // this.dataService.receiveData.subscribe(
    //   (address: any) => {
    //     console.log(address);
    //     this.address=address
    //   }
    // )
  }
  Note() {
    this.display = false;
    console.log(this.createNotesForm.value.description);
  }

  onSubmit() {
    this.display = true;
    if (this.createNotesForm.valid) {
      let data = {
        desc: this.createNotesForm.value.description,
        lat: this.latlng.lat,
        lng: this.latlng.lng,
        // address:this.address
      }
      console.log("data sent", data);
      this.dataService.sendData(data);
      this.http.post<any>("http://localhost:8000/auth/location", data)
        .subscribe(res => {
          console.log("pinned location", res);
        },
          err => {
            console.log("something went wrong");
          })
    }
  }
}
