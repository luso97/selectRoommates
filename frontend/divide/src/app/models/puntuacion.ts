export class Puntuacion {
    piso: string;
    puntuaciones: number[];
    nombre: string;
    constructor(obj: any){
        this.piso = obj['piso'];
        this.nombre = obj['nombre'];
        this.puntuaciones=[];
        var punts = obj['puntuaciones']
        punts.split(",").map(x=>this.puntuaciones.push(x));
    }
}
