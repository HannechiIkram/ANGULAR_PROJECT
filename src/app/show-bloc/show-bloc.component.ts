import { Component, OnInit } from '@angular/core';
import { BlocService } from '../bloc.service';
import { Bloc } from '../models/bloc';
import { MatDialog } from '@angular/material/dialog';
import { AddBlocComponent } from '../add-bloc/add-bloc.component';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';

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

  constructor(private b: BlocService, public dialog: MatDialog,private router:Router) {}

  ngOnInit(): void {
  this.showblocs();
  }
  showblocs(){
    this.b.showBloc().subscribe(
      res => {
        this.totalBlocs = res.length;
        this.blocs = res;
        console.log(res);
      }
    );
  }

  searchTerm: string = '';
  advancedSearch() {
    if (this.searchTerm.length >= 2) {
      // Perform the search based on the first two characters
      const filteredFoyers = this.blocs.filter(bloc => {
        const firstTwoChars = bloc.nomBloc.substring(0, 2).toLowerCase();
        return firstTwoChars.includes(this.searchTerm.toLowerCase());
      });

      // Update the displayed foyers with the filtered results
      this.blocs = filteredFoyers;
    } else {
      // If the search term is less than two characters, reset the foyers to the original data
      this.showblocs();
    }
  }
 

  deleteBloc(idbloc: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.b.deleteBloc(idbloc).subscribe(
          () => {
            const index = this.blocs.findIndex(bloc => bloc.idBloc === idbloc);
  
            if (index !== -1) {
              this.blocs.splice(index, 1);
            }
  
            Swal.fire({
              title: 'Deleted!',
              text: 'The Bloc has been deleted successfully.',
              icon: 'success'
            });
          },
          (error) => {
            console.error('Error deleting Bloc:', error);
            Swal.fire({
              title: 'Error!',
              text: 'An error occurred while deleting the Bloc.',
              icon: 'error'
            });
          }
        );
      }
    });
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

  navigateToDetaillBloc(fId: number) {
    this.router.navigate(['content/detailBloc',fId]);
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
