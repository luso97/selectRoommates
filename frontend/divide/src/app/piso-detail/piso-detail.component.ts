import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, Form } from '@angular/forms';
import { PisosService } from '../services/pisos.service';

@Component({
  selector: 'app-piso-detail',
  templateUrl: './piso-detail.component.html',
  styleUrls: ['./piso-detail.component.css']
})
export class PisoDetailComponent implements OnInit {

  formNewPiso: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private pisoService: PisosService
  ) { }

  ngOnInit(): void {
    this.formNewPiso = this.formBuilder.group({
      name: ['',Validators.required],
      pisos: this.formBuilder.array([new FormControl(0,[Validators.pattern(/^[0-9]*$/),Validators.required])]),
      habitants : this.formBuilder.array([new FormControl('',Validators.required)])
    })
  }
  createPiso(){
    return new FormControl(0);
  }
  deleteHab(i){
    this.habitants.removeAt(i);
  }

  deletePiso(i){
    this.pisos.removeAt(i);
  }
  addPiso(){
    console.log("er");
    this.pisos.push(new FormControl(0,[Validators.pattern(/^[0-9]*$/),Validators.required]));

  }
  get pisos(){
    return this.formNewPiso.get("pisos") as FormArray;
  }
  createHabitant(){
    return new FormControl(0);
  }
  addHabitant(){

    this.habitants.push(new FormControl(0,Validators.required));

  }
  get habitants(){
    return this.formNewPiso.get("habitants") as FormArray;
  }
  submit(){
    var request = {};
    request['nombre']=this.formNewPiso.get("name").value;
    var pisos="" ;
    console.log(this.pisos.getRawValue())
    this.pisos.getRawValue().map(x=>pisos=pisos+x+",");
    var habitantes = "";
    this.habitants.getRawValue().map(x =>habitantes=habitantes+x+",");
    console.log(habitantes);
    console.log(pisos);
    request['habitantes']=habitantes;
    request['habitaciones']=pisos;
    this.pisoService.create(request).subscribe(response=>{
      console.log(response);
    })

  }

}
