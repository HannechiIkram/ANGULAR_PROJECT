import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bloc } from 'src/app/models/bloc';
import { FoyerService } from 'src/app/service/foyer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assignation-blocs',
  templateUrl: './assignation-blocs.component.html',
  styleUrls: ['./assignation-blocs.component.scss']
})
export class AssignationBlocsComponent implements OnInit {

  blocs: Bloc[] = [];
  NouvelleListeBlocs: Bloc[] = [];
  messageErreur: boolean = false;
  assignClicked = false;

  selectedBlocNames: string[] = [];
  idFoyer: number;
  capaciteDisponible: number;
  SelectedBlocs: string[] = [];
  filteredOptions: string[] = [];
  capaciteErr: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private foyerService: FoyerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idFoyer = params['idFoyer'];
      this.capaciteDisponible = params['capaciteFoyer'] - params['blocsDispo'];
      this.getAllBlocs();
    });
  }

  onAssignClick() {
    this.assignClicked = true;
  }

  filterOptions(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.filteredOptions = this.selectedBlocNames.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  getAllBlocs() {
    this.foyerService.getAllBlocsNull().subscribe((data: Bloc[]) => {
      this.blocs = data;

      if (this.selectedBlocNames.length === 0) {
        this.selectedBlocNames = this.blocs.map(bloc => bloc.nomBloc ?? '');
        this.filteredOptions = this.selectedBlocNames;
      }
    });
  }

  onSelectionChange(selectedNames: any[]) {
    if (Array.isArray(selectedNames)) {
      this.SelectedBlocs = [...selectedNames];

      this.NouvelleListeBlocs = this.blocs.filter(bloc =>
        selectedNames.includes(bloc.nomBloc ?? '')
      );
    } else if (typeof selectedNames === 'object' && selectedNames !== null) {
      const anySelectedNames = selectedNames as any;
      if ('value' in anySelectedNames) {
        this.SelectedBlocs = [...anySelectedNames.value];

        this.NouvelleListeBlocs = this.blocs.filter(bloc =>
          anySelectedNames.value.includes(bloc.nomBloc ?? '')
        );
      } else {
        console.error('Invalid selection input:', selectedNames);
      }
    } else {
      console.error('Invalid selection input:', selectedNames);
    }
  }

  selectAllOptions() {
    this.SelectedBlocs = [...this.selectedBlocNames];
    this.NouvelleListeBlocs = [...this.blocs];
  }

  ResetOptions() {
    this.SelectedBlocs = [];
    this.NouvelleListeBlocs = [];
  }

  // assignBlocsToFoyer() {
  //   if (this.SelectedBlocs.length > 0) {
  //     if (this.NouvelleListeBlocs.length <= this.capaciteDisponible) {
  //       if (this.idFoyer && this.NouvelleListeBlocs.length > 0) {
  //         this.foyerService.addBlocToFoyer(this.idFoyer, this.NouvelleListeBlocs).subscribe(
  //           (response: string) => {
  //             console.log(response);
  //           },
  //           (error: any) => {
  //             console.error('Error while assigning blocs to foyer:', error);
  //           }
  //         );
  //       } else {
  //         console.error('Invalid Foyer ID or no blocs selected!');
  //       }
  //     } else {
  //       this.capaciteErr = true;
  //     }
  //   } else {
  //     this.messageErreur = true;
  //   }
  // }

  // assignBlocsToFoyer() {
  //   if (this.SelectedBlocs.length > 0) {
  //     if (this.NouvelleListeBlocs.length <= this.capaciteDisponible) {
  //       if (this.idFoyer && this.NouvelleListeBlocs.length > 0) {
  //         this.foyerService.addBlocToFoyer(this.idFoyer, this.NouvelleListeBlocs).subscribe(
  //           (response: string) => {
  //             console.log(response);

  //             // Show SweetAlert notification on success
  //             Swal.fire({
  //               title: 'Success!',
  //               text: 'Blocs added to foyer successfully.',
  //               icon: 'success',
  //               confirmButtonText: 'OK'
  //             }).then(() => {
  //               // Redirect to foyer
  //               this.router.navigate(['/foyer']);  // Update the route as needed
  //             });
  //           },
  //           (error: any) => {
  //             console.error('Error while assigning blocs to foyer:', error);
  //           }
  //         );
  //       } else {
  //         console.error('Invalid Foyer ID or no blocs selected!');
  //       }
  //     } else {
  //       this.capaciteErr = true;
  //     }
  //   } else {
  //     this.messageErreur = true;
  //   }
  // }


  assignBlocsToFoyer() {
     if (this.SelectedBlocs.length > 0) {
      // if (this.NouvelleListeBlocs.length <= this.capaciteDisponible) {
      //   if (this.idFoyer && this.NouvelleListeBlocs.length > 0) {
          this.foyerService.addBlocToFoyer(this.idFoyer, this.NouvelleListeBlocs).subscribe(
            (response: string) => {
              console.log(response);

              Swal.fire({
                title: 'Success!',
                text: 'Blocs added to foyer successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                this.router.navigate(['/foyer']);
              });
            },
            (error: any) => {
              console.error('Error while assigning blocs to foyer:', error);

              Swal.fire({
                title: 'Error!',
                text: 'An error occurred while assigning blocs to foyer.',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          );
        } else {
          console.error('Invalid Foyer ID or no blocs selected!');
        }
      // } else {
      //   this.capaciteErr = true;
      // }
    // } else {
    //   this.messageErreur = true;
    // }
  }

}
