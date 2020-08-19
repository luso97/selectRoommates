import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import { PisosService } from '../services/pisos.service';
import { Piso } from '../models/piso';
import { PuntuacionesDetailComponent } from '../puntuaciones-detail/puntuaciones-detail.component';
import { Puntuacion } from '../models/puntuacion';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import {Genetic} from "genetic-js";

@Component({
  selector: 'app-pisos',
  templateUrl: './pisos.component.html',
  styleUrls: ['./pisos.component.css']
})
export class PisosComponent implements OnInit {
  formPiso:FormGroup;
  piso:Piso
  genetic:any
  names: string[];
  cargando:boolean = false;
  dictNames:any={};
  pisoAct: boolean = false;
  puntuaciones: Puntuacion[];
  pisosFinales:[];
  constructor(
    private formBuilder: FormBuilder,
    private pisoService: PisosService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    var namePiso = this.actRoute.snapshot.params['namePiso'];
    
    this.formPiso = this.formBuilder.group({
      pisoIdName: ['',Validators.required]
    });
    if (namePiso){
      this.formPiso.get("pisoIdName").setValue(namePiso);
      this.submit();
    }
  }
  submit(){
    console.log(this.formPiso.get("pisoIdName").value)
    this.pisoService.getOne(this.formPiso.get("pisoIdName").value).subscribe(response=>{
      this.piso=new Piso(response);
      this.pisoAct=true;
      this.pisosFinales=undefined;
      this.names =[];
      this.puntuaciones=[];
      console.log(this.piso);
      this.pisoService.getPuntuaciones(this.piso.id).subscribe(response=>{
        var respuesta = response as Array<any>
        respuesta.map(x=>this.puntuaciones.push(new Puntuacion(x)));
        this.puntuaciones.map(x=>this.names.push(x.nombre));
        this.dictNames={};
        for (var i=0;i<this.piso.habitantes.length;i++){
          this.dictNames[this.piso.habitantes[i]]=i;
        }
      })
    })
    
  }
  calculateRooms(){
    this.pisosFinales= this.geneticAlgo()
    console.log(this.pisosFinales);
  }
  geneticAlgo(){
    console.log("itoo")
    const Genetic:any = require('genetic-js');
    var genetic = Genetic.create();
    genetic.optimize = Genetic.Optimize.Maximize;
    genetic.select1 = Genetic.Select1.Tournament2;
    genetic.select2 = Genetic.Select2.FittestRandom;
    genetic.dictNames= this.dictNames;
    genetic.finalresult=[];
    genetic.seed = function(){
      let res = [];
      var max = this.piso.habitaciones.length;
      for(var i=0;i<max;i++){
        var maxs=this.piso.habitaciones[i]
        for(var j=0;j<maxs;j++)
          res.push(i);
      }
      return res;
    }
    var _this =this;

    genetic.piso=this.piso;
    genetic.puntuaciones=this.puntuaciones;
    genetic.fitness = function(entity:number[]) {
      var max = this.piso.habitaciones.length;
      var res = 0.;
      for(var i=0;i<max;i++){
        var val=0.;
        var indices = entity.map((x,d)=>x===i ? d:'').filter(String);

        indices.forEach(valor=>{
          var nombre=this.piso.habitantes[valor];

          var punt = this.puntuaciones[this.dictNames[nombre]]['puntuaciones'];

          indices.forEach(x=>{
             if(x!=valor) {
               x=+x;
               val=val+punt[x]*1;
             }
          })
        })

        res = res+ (val/this.piso.habitaciones[i]);

      }
      return res;
    };
    
    genetic.mutate=function(individual : number[]){
      var ar=individual;
      for(var i=0;i<ar.length;i++){
        var d=Math.random()
        if(d<0.9){
          var x=Math.floor(Math.random()*ar.length)
          var t=ar[i]
          ar[i]=ar[x];
          ar[x]=t
        }
      }
      return ar;
    }
    genetic.iterations=250;
    genetic.size=20;
    console.log(genetic);
    genetic.generation = function (pop, generation, stats) {
    };
    genetic.pisosFinales=undefined;
    genetic.notification = function (pop, generation, stats, isFinished) {

      // console.log('generation+1 : ' + generation+1);
      // console.log('pop[0].entity : ' + pop[0].entity);
      // console.log('pop[0].fitness : ' + pop[0].fitness);
      // console.log('stats.mean.toPrecision(4) : ' + stats.mean.toPrecision(4));
      // console.log('stats.stdev.toPrecision(4) : ' + stats.stdev.toPrecision(4));

      // console.log('pop[0] : ' + JSON.stringify(pop[0]));
      // console.log('isFinished : ' + isFinished);
      if (isFinished) {

          this.cargando = false;
          console.log(pop);
          console.log(pop[0]);
          genetic.finalresult = {final:pop[0],fitness: pop[0].fitness};
          genetic.pisosFinales=pop[0].entity;
          console.log('stats : ' + JSON.stringify(stats));
          console.log('generation : ' + JSON.stringify(generation));
          console.log(genetic.finalresult)
          _this.pisosFinales=genetic.pisosFinales;
          
        }
    };
    let config = {
      "size": 20,
      "crossover": 0.01,
      "mutation": 0.7,
      "iterations": 50,
      "fittestAlwaysSurvives": true,
      "maxResults": 100,
      "webWorkers": true,
      "skip": 10
    };
    this.cargando  =true;
    genetic.evolve(config, {});
    
    return genetic.pisosFinales;
    

  }
  
  addRating(name){
    this.router.navigate(["puntuaciones/0",{name : name, piso: this.piso.id}]);
  }

}
