import { HttpClient } from '@angular/common/http';
import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, AfterViewInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';

import { DataServiceService } from 'src/app/Services/DataService/data-service.service';
import { OpenDialogComponent } from '../open-dialog/open-dialog.component';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements AfterViewInit {

  private map: any;
  marker: any;
  locationsArray: any = [];
  Latlong: any
  @Input() address: any=[];



  constructor(private http: HttpClient, public dialog: MatDialog, private dataService: DataServiceService) { }

  openDialog() {
    this.dialog.open(OpenDialogComponent);
  }
  ngOnInit(): void {
    this.getlocation();
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }
  onLocation(): void {
    this.map.on('click', (e: any) => {
      this.marker = L.marker([e.latlng.lat, e.latlng.lng], {
      })
      let Latlong = {
        lat: e.latlng.lat,
        lng: e.latlng.lng
      }
      this.dataService.sendData(Latlong);
      this.http.get<any>(`https://nominatim.openstreetmap.org/reverse?lat=${Latlong.lat}&lon=${Latlong.lng}&format=json`).subscribe(
        (req: any) => {
          console.log(req);
          console.log("hello world")
          
            this.address= req.address
          
          this.dataService.sendData(this.address);
        }
      )
    })
  }

getaddress(){
}
  getlocation() {
    this.http.get<any>("http://localhost:8000/getlocation").subscribe(
      (req: any) => {
        console.log(req);
        this.locationsArray = req.data;
        console.log(this.locationsArray)
        this.dataService.sendData(this.locationsArray);
      },

      err => {
        console.log("something went wrong")
      }
    )
  }
  ngAfterViewInit(): void {
    this.initMap();
    this.onLocation();
  }
}



