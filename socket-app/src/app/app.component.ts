import { Component, OnInit } from '@angular/core';
import {startWith} from 'rxjs/operators';
import {VotingService} from './services/voting.service';
import {Subscription} from 'rxjs';
import {AppState} from './voting-state';
import * as bootstrap from 'bootstrap';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public activeView: string;
  public clientHeight: number;
  public APP_STATES = AppState;
  public currentAppState: string;
  private stateSubscription: Subscription;
  private isAuthenticated: boolean;
  constructor(private votingService: VotingService) {
    this.isAuthenticated = false;
    this.activeView = 'voting';
    this.clientHeight = window.innerHeight;
    console.log(this.clientHeight);
  }


  ngOnInit() {
    this.votingService.getApplicationState();

    this.stateSubscription = this.votingService.votingState.pipe(
      startWith(AppState.WAITING_FOR_MATCH)
    ).subscribe(applicationState => {
      this.currentAppState = applicationState;
    });
  }

  tryActivateManagerView() {
    if (this.isAuthenticated) {
      this.activeView = 'manager';
    } else {
      $('#authModal').modal();
    }
  }

  tryAuthenticate() {
    
  }
}