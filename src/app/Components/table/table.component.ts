import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  locationsArray: any = [];
  id: any;
  DeleteId: any;

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.getlocation();

  }
  getlocation() {
    this.http.get<any>("http://localhost:8000/getlocation").subscribe(
      (req: any) => {
        console.log(req);
        this.locationsArray = req.data;
        console.log(this.locationsArray)
      },
      err => {
        console.log("something went wrong")
      }
    )
  }
  deletelocation(id: any) {
    let req = {
      DeleteId: id,
      isDeleted: true,
    }
    console.log("id", req)
    // console.log(req);
    this.http.post<any>("http://localhost:8000/deleteLocation", req).subscribe(
      (res: any) => {
        console.log("deleted succesfully",res);
      },
      err => {
        console.log("something went wrong");
      })
  }
}
