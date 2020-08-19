export class Piso {
    id: string;
    name: string;
    habitantes: string[];
    habitaciones: number[];
    constructor(objeto: any){
        this.id = objeto['id'];
        this.name= objeto['nombre'];
        var habitantes: string =objeto["habitantes"];
        this.habitantes = [];
        habitantes.split(",").map(x=>this.habitantes.push(x));
        this.habitaciones = [];
        var habitaciones = objeto['habitaciones'];
        habitaciones.split(",").map(x=>this.habitaciones.push(x*1));
        this.habitaciones.pop();
        this.habitantes.pop();
    }
}
