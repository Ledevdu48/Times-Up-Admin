import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js'
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  @Input() socket: any;

  rooms: any;

  numberRooms: number;
  numberPlayers: number;
  averageScorePerRoom: number;

  dataNumberRooms1hour: number[] = [];
  dataNumberPlayers1hour: number[] = [];
  dataAverageScorePerRoom1hour: number[] = [];
  labels1hour: string[] = [];

  dataNumberRooms24hours: number[] = [];
  dataNumberPlayers24hours: number[] = [];
  dataAverageScorePerRoom24hours: number[] = [];
  labels24hours: string[] = [];

  dataNumberRooms1week: number[] = [];
  dataNumberPlayers1week: number[] = [];
  dataAverageScorePerRoom1week: number[] = [];
  labels1week: string[] = [];

  canvas: any;
  ctx: any;
  chart: any;

  constructor() { }

  ngOnInit() {
    this.socket.on('rooms', rooms => {
      this.rooms = rooms;

      this.numberRooms = this.rooms.length;

      let sumPlayer = 0;
      let sumScore = 0;

      for (let room of this.rooms) {
        let game = room.game;
        sumPlayer += game.players.length;
        sumScore += game.score[0] + game.score[1];
      }

      this.numberPlayers = sumPlayer;
      this.averageScorePerRoom = sumScore / this.numberRooms;
    })
  }

  ngAfterViewInit() {
    this.socket.emit('askRooms')

    this.initCanvas()

    setInterval(() => {
      this.socket.emit('askRooms')
      this.chart.update();
      if(this.dataNumberRooms1hour.length<20){
        this.dataNumberPlayers1hour.push(this.numberPlayers);
        this.dataNumberRooms1hour.push(this.numberRooms);
        this.dataAverageScorePerRoom1hour.push(this.averageScorePerRoom);
        
        var num = -this.dataNumberPlayers1hour.length*3;
        this.labels1hour.unshift(num.toString());
      } else {
        this.dataNumberPlayers1hour.splice(0,1);
        this.dataNumberRooms1hour.splice(0,1);
        this.dataAverageScorePerRoom1hour.splice(0,1);
        this.dataNumberPlayers1hour.push(this.numberPlayers);
        this.dataNumberRooms1hour.push(this.numberRooms);
        this.dataAverageScorePerRoom1hour.push(this.averageScorePerRoom);
      }
    }, 1000*60*3)

    setInterval(() => {
      this.socket.emit('askRooms')
      this.chart.update();
      if(this.dataNumberRooms24hours.length<24){
        this.dataNumberPlayers24hours.push(this.numberPlayers);
        this.dataNumberRooms24hours.push(this.numberRooms);
        this.dataAverageScorePerRoom24hours.push(this.averageScorePerRoom);

        var num = -this.dataNumberPlayers24hours.length;
        this.labels24hours.unshift(num.toString());
      } else {
        this.dataNumberPlayers24hours.splice(0,1);
        this.dataNumberRooms24hours.splice(0,1);
        this.dataAverageScorePerRoom24hours.splice(0,1);
        this.dataNumberPlayers24hours.push(this.numberPlayers);
        this.dataNumberRooms24hours.push(this.numberRooms);
        this.dataAverageScorePerRoom24hours.push(this.averageScorePerRoom);
      }
    }, 1000*60*60)

    setInterval(() => {
      this.socket.emit('askRooms')
      this.chart.update();
      if(this.dataNumberRooms1week.length<21){
        this.dataNumberPlayers1week.push(this.numberPlayers);
        this.dataNumberRooms1week.push(this.numberRooms);
        this.dataAverageScorePerRoom1week.push(this.averageScorePerRoom);

        var num = -this.dataNumberPlayers1week.length*8;
        this.labels1week.unshift(num.toString());
      } else {
        this.dataNumberPlayers1week.splice(0,1);
        this.dataNumberRooms1week.splice(0,1);
        this.dataAverageScorePerRoom1week.splice(0,1);
        this.dataNumberPlayers1week.push(this.numberPlayers);
        this.dataNumberRooms1week.push(this.numberRooms);
        this.dataAverageScorePerRoom1week.push(this.averageScorePerRoom);
      }
    }, 1000 * 60 * 60 * 8)

    this.chart = new Chart(this.ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: [],
        datasets: []
      }
    });
  }

  onUpdate() {
    this.socket.emit('askRooms')
  }

  initCanvas() {
    this.canvas = <HTMLCanvasElement>document.getElementById("myChart")
    if (this.canvas != null) {
      this.ctx = this.canvas.getContext('2d');
    }
  }

  onPlotData1hour() {
    this.chart.data.labels = this.labels1hour;
    this.chart.data.datasets = [
      {
      label: 'Number of players connected',
      data: this.dataNumberPlayers1hour,
      fill: 'false',
      borderColor: 'rgba(240, 52, 52, 1)',
      pointBackgroundColor: 'rgba(240, 52, 52, 1)'
      },
      {
        label: 'Number of rooms',
        data: this.dataNumberRooms1hour,
        fill: 'false',
        borderColor: 'rgba(31, 58, 147, 1)',
        pointBackgroundColor: 'rgba(31, 58, 147, 1)'
      },
      {
        label: 'Average score per Room',
        data: this.dataAverageScorePerRoom1hour,
        fill: 'false',
        borderColor: 'rgba(38, 166, 91, 1)',
        pointBackgroundColor: 'rgba(38, 166, 91, 1)'
      }
    ]
    this.chart.update();
  }

  onPlotData24hours() {
    this.chart.data.labels = this.labels24hours;
    this.chart.data.datasets = [
      {
      label: 'Number of players connected',
      data: this.dataNumberPlayers24hours,
      fill: 'false',
      borderColor: 'rgba(240, 52, 52, 1)',
      pointBackgroundColor: 'rgba(240, 52, 52, 1)'
      },
      {
        label: 'Number of rooms',
        data: this.dataNumberRooms24hours,
        fill: 'false',
        borderColor: 'rgba(31, 58, 147, 1)',
        pointBackgroundColor: 'rgba(31, 58, 147, 1)'
      },
      {
        label: 'Average score per Room',
        data: this.dataAverageScorePerRoom24hours,
        fill: 'false',
        borderColor: 'rgba(38, 166, 91, 1)',
        pointBackgroundColor: 'rgba(38, 166, 91, 1)'
      }
    ]
    this.chart.update();
  }

  onPlotData1week() {
    this.chart.data.labels = this.labels1week;
    this.chart.data.datasets = [
      {
      label: 'Number of players connected',
      data: this.dataNumberPlayers1week,
      fill: 'false',
      borderColor: 'rgba(240, 52, 52, 1)',
      pointBackgroundColor: 'rgba(240, 52, 52, 1)'
      },
      {
        label: 'Number of rooms',
        data: this.dataNumberRooms1week,
        fill: 'false',
        borderColor: 'rgba(31, 58, 147, 1)',
        pointBackgroundColor: 'rgba(31, 58, 147, 1)'
      },
      {
        label: 'Average score per Room',
        data: this.dataAverageScorePerRoom1week,
        fill: 'false',
        borderColor: 'rgba(38, 166, 91, 1)',
        pointBackgroundColor: 'rgba(38, 166, 91, 1)'
      }
    ]
    this.chart.update();
  }

}
