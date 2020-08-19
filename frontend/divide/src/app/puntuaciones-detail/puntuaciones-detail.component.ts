import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Piso } from '../models/piso';
import { FormArray, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { PisosService } from '../services/pisos.service';

@Component({
  selector: 'app-puntuaciones-detail',
  templateUrl: './puntuaciones-detail.component.html',
  styleUrls: ['./puntuaciones-detail.component.css']
})
export class PuntuacionesDetailComponent implements OnInit {

  name: string;
  pisoId: string;
  piso: Piso;
  formPunts: FormGroup;
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private formBuild: FormBuilder,
    private pisosService: PisosService
  ) { }

  ngOnInit(): void {
    this.name = this.actRoute.snapshot.params['name'];
    this.pisoId = this.actRoute.snapshot.params['piso'];
    this.pisosService.getById(this.pisoId).subscribe(response=>{
      this.piso = new Piso(response);
      console.log(this.piso);
      this.formPunts=this.formBuild.group({
        punts:this.formBuild.array([])
      })
      
      this.piso.habitantes.forEach(x=>{
        this.punts.push(new FormControl('',Validators.required));
      })
    })
  }
  get punts(){
     return this.formPunts.get("punts") as FormArray; 
  }

  submit(){
    var request = {};
    request['nombre']=this.name;
    var puntuaciones = "";
    this.punts.getRawValue().map(x =>puntuaciones=puntuaciones+x+",");
    request['puntuaciones'] = puntuaciones;
    request['piso']=this.pisoId;
    this.pisosService.createPuntuaciones(request).subscribe(response=>{
      
      this.router.navigate(['pisos',{namePiso:this.piso.name}])
    })
  }
}
