import { Component, EventEmitter,Input,Output, SimpleChanges } from "@angular/core"
import { BlocService } from "../bloc.service"
import { Bloc } from "../models/bloc"

@Component({
  selector: 'app-update-bloc',
  templateUrl: './update-bloc.component.html',
  styleUrls: ['./update-bloc.component.scss']
})
export class UpdateBlocComponent {
  @Input()bloc =new Bloc();
  @Output()notif=new EventEmitter();
  @Output()updateUser=new EventEmitter()
  errorData: any = {};

  constructor(private s:BlocService){
  
  }
  ngOnInit(){
  
  }
  showForm(){
    this.notif.emit('bonjour')
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
  
  update(updateBloc:any){
  this.s.updateBloc(updateBloc,this.bloc?.idBloc).subscribe(
    (res)=>{
  this.updateUser.emit(updateBloc)
    },
    (error)=>{
      this.errorData = error; 
    }
  )
  }
}