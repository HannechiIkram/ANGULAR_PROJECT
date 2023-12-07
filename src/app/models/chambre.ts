import { Reservation } from "./Reservation";
import { Bloc } from "./bloc";

export class Chambre {
    idChambre!:number;
    numerochamber:number;
    typeC!:string;
    description!:string;
    etat!:boolean;
    CreatedAt!:Date;
    UpdatedAt!:Date;
    res!:Reservation[];
    bloc!:Bloc;
}
