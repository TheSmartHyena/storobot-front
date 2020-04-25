import { Component, OnInit } from '@angular/core';
import { RobotService } from './../../shared/robot.service';
import { ActivatedRoute } from '@angular/router';
import { Robot } from './../../shared/robot';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.css']
})
export class RobotComponent implements OnInit {

    robotId: String;
    robots: Robot[] = [];

    constructor(private robotService: RobotService, private actRoute: ActivatedRoute) {
        this.robotId = this.actRoute.snapshot.params.id;
        /*this.robotService.getRobot(this.robotId).then((msg) => {
            //console.log(msg.msg);
            this.robot = msg.msg;
            //this.robotType = this.robot.type
            console.log(this.robot);
        });*/
        //this.robot = this.getSingleRobot(this.actRoute.snapshot.params.id);
    }

    async ngOnInit(): Promise<any> {

        const res = await this.getRobot(this.robotId);
        this.robots.push(new Robot(res.msg.name, res.msg.type, res.msg.price));
    }

    async getRobot(id: String): Promise<any> {
        return this.robotService.getRobot(id);
    }

}
