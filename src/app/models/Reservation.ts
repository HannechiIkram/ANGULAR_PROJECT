import { Chambre } from "./chambre"; 
import {Etudiant} from "./Etudiant";
export class Reservation{
  idReservation!: number;
  anneeReservation!: string ;
  estValide!: boolean ;
  numeroChamber?: number;
  etudiants: Etudiant[];
  chambre:Chambre[];
}
