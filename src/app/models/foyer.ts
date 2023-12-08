import { Universite } from "../pages/ui-components/universite/models/Universite";
import { Bloc } from "./bloc";



export class Foyer {
    idFoyer !: number;
    nomFoyer!: string
    capaciteFoyer!: number;
    etat!:boolean;
    createdAt!:Date;
    updatedAt!:Date;
    universite !:Universite ;
    blocs!:Bloc[];
}