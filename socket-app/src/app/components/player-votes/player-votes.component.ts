import {Component, OnInit, ViewChild} from '@angular/core';
import {VotingService} from '../../services/voting.service';
import {startWith} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-player-votes',
  templateUrl: './player-votes.component.html',
  styleUrls: ['./player-votes.component.scss']
})
export class PlayerVotesComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        barPercentage: 0.5,
        barThickness: 1,
        maxBarThickness: 3,
        minBarLength: 2,
        display: true,
        ticks: {
          beginAtZero: true,
          steps: 10,
          stepValue: 1,
          max: 10
        }
      }]
    },
  };
  public barChartLabels = [];
  public barChartType = 'horizontalBar';
  public barChartLegend = false;
  public barChartData = [
    {data: [], label: 'Stemmer', backgroundColor: 'rgba(0, 123, 255, 0.3)'}
  ];
  private voteSub: Subscription;
  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;

  constructor(private votingService: VotingService) { }

  ngOnInit() {
    this.votingService.getVotes();
    this.voteSub = this.votingService.voteEntries.pipe(
      startWith([])
    ).subscribe(voteEntries => {
      if (voteEntries && voteEntries.length > 0) {
        this.updateChartData(voteEntries);
      }
    });
  }

  private updateChartData(voteEntries) {
    this.barChartLabels = [];
    const data = [];
    // @ts-ignore
    voteEntries.forEach(voteEntry => {
      data.push(voteEntry.votes);
      this.barChartLabels.push(voteEntry.player.name);
    });
    this.barChartData[0].data = data;
    this.chart.update();
  }
}