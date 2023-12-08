import { Component } from '@angular/core';
import { Universite } from '../models/Universite';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversiteService } from '../service/universite.service';

@Component({
  selector: 'app-showuniversite',
  templateUrl: './showuniversite.component.html',
  styleUrls: ['./showuniversite.component.scss']
})
export class ShowuniversiteComponent {
  universites: Universite[] = [];
  pageSize: number = 3; // Set the number of items per page
  currentPage: number = 1;
  startIndex: number = 0;

  constructor(
    private universiteService: UniversiteService,
    private router: Router,
    private ac: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.showUniversites();
  }

  showUniversites(): void {
    this.universiteService.findAllUniversite().subscribe(
      (data: Universite[]) => {
        this.universites = data;
      },
    );
  }

  get endIndex(): number {
    return this.startIndex + this.pageSize;
  }

  get paginatedItems(): Universite[] {
    return this.universites.slice(this.startIndex, this.endIndex);
  }

  searchTerm: string = '';

  advancedSearch() {
    if (this.searchTerm.length >= 2) {
      const filteredFoyers = this.universites.filter(Universite => {
        const firstTwoChars = Universite.nomUniversite.substring(0, 2).toLowerCase();
        return firstTwoChars.includes(this.searchTerm.toLowerCase());
      });

      this.universites = filteredFoyers;
    } else {
      this.showUniversites();
    }
  }

  delete(id: any) {
    this.universiteService.deleteUniversite(id).subscribe(
      () => {
        alert('you want to delete this university ?');
        window.location.reload();
      },
      (err) => {
        let status = err.status;
        switch (status) {
          case 0: alert('server '); break;
          case 401: alert('unauthoriz '); break;
          case 404: alert('unauthoriz '); break;
        }
      },
    );
  }

  navigateToUpdateUniversite(fId: number) {
    this.router.navigate(['content/update', fId]);
  }

  navigateToDetail(fId: number) {
    this.router.navigate(['content/detail', fId]);
  }

  navigateToAdd() {
    this.router.navigate(['content/add']);
  }

  nextPage() {
    this.startIndex += this.pageSize;
    this.currentPage += 1;
  }

  prevPage() {
    this.startIndex -= this.pageSize;
    this.currentPage -= 1;
  }
}
