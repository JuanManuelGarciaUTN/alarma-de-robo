import { Component, OnInit } from '@angular/core';
import { BaseDeDatosService } from '../services/base-de-datos.service';
import { Router } from '@angular/router';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Flashlight } from '@ionic-native/flashlight/ngx';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent  implements OnInit {

  public activado = false;
  public passwordMal = false;
  public texto = "";
  public estado = 2;
  public x = 0;
  public z = 0;
  public y = 0;
  public audio1;
  public audio2;
  public audio3;
  public audio4;
  public audio5;
  public cerrandoSesion = false;
  public evento?: DeviceMotionEvent;
  public intentoApagar = false;
  constructor(private db: BaseDeDatosService, private router: Router,private flashlight: Flashlight) { 
    this.audio1 = new Audio();
    this.audio2 = new Audio();
    this.audio3 = new Audio();
    this.audio4 = new Audio();
    this.audio5 = new Audio();
    this.audio1.src = "../../assets/1.mp3";
    this.audio2.src = "../../assets/2.mp3";
    this.audio3.src = "../../assets/3.mp3";
    this.audio4.src = "../../assets/4.mp3";
    this.audio5.src = "../../assets/5.mp3";
    this.audio1.load();
    this.audio2.load();
    this.audio3.load();
    this.audio4.load();
    this.audio5.load();
  }

  ngOnInit(): void {
    window.addEventListener("deviceorientation", (event) => {
      if(this.activado){
        if(event){
          this.x = event.alpha || 0;
          this.y = event.beta || 0;
          this.z = event.gamma || 0;
          if(this.estado == 2){
            if(this.y < 20 && this.z < 0){
              this.estado = -1;
            }
            if(this.y < 20 && this.z > 0){
              this.estado = 1
            }
            if(this.y > 20){
              this.estado = 0;
            }
          }
          if(this.y < 20){
            if(this.z < 0){
              if(this.estado == 0){
                this.estado = -1;
                this.movesIzquierdaHorizontal();
              }
            }
            else{
              if(this.estado == 0){
                this.estado = 1;
                this.movesDerechaHorizontal();
              }
            }
          }
          else {
            if(this.estado == 1){
              this.estado = 0;
              this.moverIzquierdaVertical();
            }
            else if(this.estado == -1){
              this.estado = 0;
              this.moverDerechaVertical();
            }
          }
        }
      }     
    });
  }

  movesIzquierdaHorizontal(){
    this.audio1.play();
    this.vibrar(5000);
  }

  vibrar(counter: number){
    Haptics.vibrate({duration:counter});
  }

  movesDerechaHorizontal(){
    this.audio2.play();
    this.vibrar(5000);
  }
  moverDerechaVertical(){
    this.audio3.play();
    this.prenderLuz();
  }
  moverIzquierdaVertical(){
    this.audio4.play();
    this.prenderLuz();
  }

  prenderLuz() {
    this.flashlight.switchOn();
    // switch off after 3 seconds
    setTimeout(() => {
      this.flashlight.switchOff(); // success/error callbacks may be passed
    }, 5000);
  }


  activar(){
    if(this.activado){
      this.desactivar();
    }
    else{
      this.activado = true;
    }
  }

  desactivar(){
    this.intentoApagar = true;
  }

  cerrarSesion(){
    if(this.activado){
      this.cerrandoSesion = true;
      this.desactivar();
    }
    else{
      this.router.navigate(['home']);
    }
  }

  verificarPass(){
    if(this.db.usuario?.clave == this.texto.trim()){
      this.activado = false;
      this.passwordMal = false;
      this.texto = "";
      this.intentoApagar = false;
      if(this.cerrandoSesion){
        this.cerrandoSesion = false;
        this.router.navigate(['home']);
      }
    }
    else{
      this.audio5.play();
      this.prenderLuz();
      this.vibrar(5000);
      this.passwordMal = true;
    }
  }
}
