import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { getTypeNameForDebugging } from '@angular/core/src/change_detection/differs/iterable_differs';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';

@Component({
  selector: 'app-test',
  template: `
  <h2> Welcome to {{ name }} </h2>
  <h2> Hello {{ getName() }} </h2>
  <input [id]="myId" type="text" value="Prasad"/>
  <input disabled={{disabled}} type="text" value="Prasad"/>
  <input [disabled]="disabled" type="text" value="Prasad"/>
  <h2 [class.test-special]="isSpecial">Class Binding</h2>
  <h2 [ngClass]="messageClsses"> Angular Class Binding  </h2>

  <h2 [style.color]="'Blue'"> Style Binding  </h2>
  <h2 [ngStyle]="styleClasses">Angular Style Binding  </h2>
  
  <button (click)="onClick($event)">Greet</button>
  {{greetMsg}}
  <button (click)="greetMsg1='Welcome inline button click'">Greet</button>
  {{greetMsg1}}
 
  <input #myInput type="text">
  <button (click)="logMessage(myInput.value)">Log</button>
  {{inputMsg}}
 
  <input [(ngModel)]="twoWayBindingname" type="text" placeholder="Two way Binding">
  {{twoWayBindingname}}

  <h2 *ngIf="displayName; else else1Block1"> If condition</h2>
  <ng-template #elseBlock1>
  <h2> Else Block</h2>
  </ng-template>

<div *ngIf="displayName; then ifBlock; else elseBlock "></div>
<ng-template #ifBlock>
  <h2> If template Data</h2>
</ng-template>
<ng-template #elseBlock>
  <h2> Else template Data</h2>
</ng-template>


<div [ngSwitch]="color">
  <div *ngSwitchCase="'red'">U picked red color</div>
  <div *ngSwitchCase="'blue'">U picked blue color</div>
  <div *ngSwitchCase="'green'">U picked green color</div>
  <div *ngSwitchDefault>U not picked any color</div>
</div>

<h2>List of names by ngFor</h2>
<div *ngFor="let name of names; index as i;first as f;odd as o ">
    <h2>{{i}} first-{{f}} odd-{{o}} {{name}}</h2>
</div>

<!-- <h2>{{parentData}}</h2> -->
<h2>{{parentName}}</h2>

<button (click)="sendData()">Click for child to parent</button>

<h2 style="color:red">Pipes</h2>
<h2>{{name|lowercase}}</h2>
<h2>{{name|uppercase}}</h2>
<h2>{{'nagireddi prasad'|titlecase}}</h2>
<h2>{{name|slice:2:6}}</h2>
<h2>{{styleClasses|json}}</h2>

<h2>{{5.678|number:'1.2-3'}}</h2>
<h2>{{5.678|number:'3.4-5'}}</h2>
<h2>{{5.678|number:'3.1-2'}}</h2>

<h2>{{0.25|percent}}</h2>
<h2>{{0.25|currency}}</h2>
<h2>{{0.25|currency:'INR'}}</h2>
<h2>{{0.25|currency:'INR':'code'}}</h2>

<h2>{{Date}}</h2>
<h2>{{Date| date:'short'}}</h2>
<h2>{{Date| date:'shortDate'}}</h2>
<h2>{{Date| date:'shortTime'}}</h2>

  `,
styles: [`
.test-success {
  color : green
}
.test-danger {
  color : red
}
.test-special {
  font-style: italic
}
`]
 
})
export class TestComponent implements OnInit {

  public name = "Prasad";
  public myId = "id1";
  public disabled = true;
  public hasError = false;
  public isSpecial = true;
  public greetMsg = "";
  public greetMsg1 = "";
  public inputMsg = "";
  public twoWayBindingname= "";
  public displayName= true;
  public color= "red";
  public names= ["Prasad","Nagireddi","Hello"];
  public Date=  new Date();
  // @Input() public parentData;
  @Input('parentData') public parentName;
  @Output() public childEvent = new EventEmitter()

  public messageClsses = {
    "test-success": !this.hasError,
    "test-danger": this.hasError,
    "test-special": this.isSpecial
  }
  public styleClasses = {
     color:"red",
  }


  constructor() { }

  ngOnInit() {
  }

  getName() {
    return "Darling!"
  }

  onClick(e) {
    console.log(e)
    this.greetMsg = "Welcome Prasad by button clcik"
  }

  sendData() {
    this.childEvent.emit("From Child to parent")
  }
  logMessage(value) {
    this.inputMsg = value;
  }
}
