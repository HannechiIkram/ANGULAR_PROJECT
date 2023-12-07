import { Component, OnInit } from '@angular/core';
import { BlocService } from '../bloc.service';
import { Bloc } from '../models/bloc';
import { MatDialog } from '@angular/material/dialog';
import { AddBlocComponent } from '../add-bloc/add-bloc.component';

@Component({
  selector: 'app-show-bloc',
  templateUrl: './show-bloc.component.html',
  styleUrls: ['./show-bloc.component.scss']
})
export class ShowBlocComponent implements OnInit {
  blocs!: Bloc[];
  show = false;
  blocToUpdate: Bloc;
  showFormAdd = false;

  constructor(private b: BlocService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.b.showBloc().subscribe(
      res => {
        this.totalBlocs = res.length;
        this.blocs = res;
        console.log(res);
      }
    );
  }

  deleteBloc(idbloc: number) {
    this.b.deleteBloc(idbloc).subscribe(
      () => {
        const index = this.blocs.findIndex(bloc => bloc.idBloc === idbloc);

        if (index !== -1) {
          this.blocs.splice(index, 1);
        }
      },
      error => {
        console.error('Error deleting bloc:', error);
      }
    );
  }

  update(bloc: any) {
    console.log(bloc);
    this.show = true;
    this.blocToUpdate = bloc;
    console.log(this.blocToUpdate);
  }

  traitement(t: any) {
    this.show = !this.show;
  }

  changeTab(e: any) {
    this.show = false;
    for (let i = 0; i < this.blocs.length; i++) {
      if (this.blocs[i].idBloc == e.idBloc) {
        this.blocs[i] = e;
      }
    }
  }

  addUser() {
    this.showFormAdd = true;
  }

  addElementToTab(e: any) {
    this.blocs.push(e);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddBlocComponent, {
      width: '450px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  pageSize = 5;
  currentPage = 1;
  totalBlocs = 0;

  getCurrentPageBlocs(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.blocs.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalBlocs / this.pageSize);
  }
}
