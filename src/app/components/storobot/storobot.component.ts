import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from './../../shared/auth.service';
import { RobotService } from './../../shared/robot.service';

@Component({
  selector: 'app-storobot',
  templateUrl: './storobot.component.html',
  styleUrls: ['./storobot.component.css']
})
export class StorobotComponent implements OnInit {
    createForm: FormGroup;
    robots: []

    constructor(
      public fb: FormBuilder,
      public authService: AuthService,
      public robotService: RobotService,
  ) {
      this.createForm = this.fb.group({
        name: [''],
        type: [''],
        price: ['']
      })
  }

  ngOnInit(): void {
      this.getRobots().then((robots) => {
          this.robots = robots;
      });
  }

  addRobot(name: String, type: String, price: String){
      this.robotService.createRobot(name, type, Number(price)).then((res) => {
          this.updateRobotList();
      });
  }

  deleteRobot(id){
      this.robotService.deleteRobot(id).then((res) => {
          // console.log(res);
          this.updateRobotList();
      })
  }

  updateRobotList(): void {
      this.getRobots().then((robots)=>{
          this.robots = robots;
      });
  }

  async getRobots(): Promise<any>{
      return this.robotService.getRobotList();
  }
}
