import { Bloc } from "./bloc";
import { Universite } from "./universite";


export class Foyer {
    idFoyer !: number;
    nomFoyer!: string
    capaciteFoyer!: number;
    etat!:boolean;
    createdAt!:Date;
    updatedAt!:Date;
    universite !:Universite ;
    bloc!:Bloc;
}