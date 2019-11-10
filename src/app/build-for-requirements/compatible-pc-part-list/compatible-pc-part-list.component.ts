import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { GameService } from '../../service/game.service';

@Component({
  selector: 'app-compatible-pc-part-list',
  templateUrl: './compatible-pc-part-list.component.html',
  styleUrls: ['./compatible-pc-part-list.component.css']
})
export class CompatiblePcPartListComponent implements OnInit {
  
  constructor(private gameService: GameService, private route: ActivatedRoute, private router: Router) { }

  private game_id: string;
  private game: string;
  private ram:string;
  private cpu:string;
  private vga:string;
  private hdd:string;
  private motherboard:string;
  private loading: boolean;
  private show: boolean;


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.game_id = params["_id"];
      this.loading = true;
      this.show = false;
      console.log(this.game_id)

      // this.gameService.getGame(this.game_id).subscribe(
      //   data => {  
      //     console.log(data['responseObject'])

      //     this.game = data['responseObject']
      //   }
      // );

      new Promise((res,rej) => {
        this.gameService.getGame(this.game_id).toPromise()
        .then((res)=> {
          console.log(res['responseObject'])

          this.game = res['responseObject']

          this.matchPcParts();
        })
        .catch((err) => {
          console.log(err)
        })
      })

      
    });
  }

  matchPcParts() {  
    // Default values
    this.cpu = "Intel Core i3-3770 @ 4 GHz ";
    this.vga = "ASUS GForce GT 1050 1GB GDDR5";
    this.hdd = "500 GB Sata WD Blue";
    this.motherboard = "Asus STRIX Z390-E GAMING";

    setTimeout(()=>{   
      this.loading = false;
      this.show = true;
 }, 5000);

    this.findCpu()
    this.findMotherboard()
    this.findRam()
    this.findVga()
    this.findHdd()
   
   
  }

  findCpu(){
    let cpu_i3 = ['Intel® Core™ i3-9100 (6M Cache, up to 4.20 GHz)', 'Intel® Core™ i3-9100F (6M Cache, up to 4.20 GHz)' ]; 
    let cpu_i5 = ['Intel® Core™ i5-9400F (9M Cache, up to 4.10 GHz)', 'Intel® Core™ i5-9400 (9M Cache, up to 4.10 GHz)', 'Intel® Core™ i5-9600K (9M Cache, up to 4.60 GHz)']; 
    let cpu_i7 = ['Intel® Core™ i7-9700F (12M Cache, up to 4.70 GHz)','Intel® Core™ i7-8700', 'Intel® Core™ i7-8700 (12M Cache, up to 4.60 GHz)', 'Intel® Core™ i7-9700 (12M Cache, up to 4.70 GHz)', 'Intel® Core™ i7-9700K (12M Cache, up to 4.90 GHz)'  ]; 
    let cpu_i9 = ['Intel® Core™ i9-9900K (16M Cache, up to 5.00 GHz)'  ]; 
    

    if(this.game["cpu"].indexOf('i3') > -1 || this.game["cpu"].indexOf('I3') > -1 ){
      this.cpu = cpu_i3[Math.floor(Math.random() * cpu_i3.length)];
    }
    if(this.game["cpu"].indexOf('i5') > -1 || this.game["cpu"].indexOf('I5') > -1 ){
      this.cpu = cpu_i5[Math.floor(Math.random() * cpu_i5.length)];
    }
    if(this.game["cpu"].indexOf('i7') > -1 || this.game["cpu"].indexOf('I7') > -1 ){
      this.cpu = cpu_i7[Math.floor(Math.random() * cpu_i7.length)];
    }
    if(this.game["cpu"].indexOf('i9') > -1 || this.game["cpu"].indexOf('I9') > -1 ){
      this.cpu = cpu_i9[Math.floor(Math.random() * cpu_i9.length)];
    }

  }

  findMotherboard() {
    let mb = ['ROG MAXIMUS XI FORMULA wifi', 'ROG MAXIMUS XI HERO (WI-FI) Call of Duty - Black Ops 4 Edition', 'ASUS ROG STRIX Z390-H GAMING','Asus STRIX Z390-E GAMING','ASUS TUF Z390-PLUS GAMING','Asus ROG STRIX H370-F GAMING','Asus TUF H370-PRO GAMING WIFI','Asus Prime B365-PLUS','Asus ROG STRIX B365-F GAMING','Asus TUF B365-PLUS GAMING','Asus PRIME B360M-A','ASUS PRIME H310M-E R2.0','Gigabyte Z390 AORUS MASTER WIFI','Gigabyte Z390 AORUS ELITE','GIgabyte Z390 AORUS ULTRA','Gigabyte Z390 GAMING X','GIGABYTE Z390 UD','Gigabyte B360 AORUS GAMING 3','Gigabyte B360 AORUS GAMING 3 WIFI','Gigabyte H370 AORUS GAMING 3 WIFI','Gigabyte H370 AORUS GAMING 3','GIgabyte B360M DS3H','MSI MPG Z390 GAMING EDGE AC','MSI MPG Z390 GAMING PLUS','MSI H370 GAMING PRO CARBON','MSI B360 GAMING PLUS'];   
    this.motherboard = mb[Math.floor(Math.random() * mb.length)];
  }

  findRam() {
  let rams_4 = ['Adata DDR4 2666Mhz 4GB', 'Kingston 4GB VALUE 2666Mhz', ]; 
  let rams_8 = ['G.SKILL Aegis 8GB DDR4 2666Mhz', 'Adata DDR4 2666Mhz 8GB', 'Team Elite Plus 8GB DDR4 2666MHz', 'G.SKILL RIPJAWS 8GB 2666MHZ (3Y)', 'Corsair Vengeance® LPX 8GB DDR4 3200Mhz' ]; 
  let rams_16 = ['Corsair Vengeance® LPX 16GB (2 x 8GB) DDR4 3200Mhz Kit', 'G.SKILL RIPJAWS 16GB 2666MHZ (3Y)', 'CORSAIR VENGEANCE 16GB DDR4 2666Mhz (LT)']; 

  console.log("-------------------------") 
  console.log(this.game["ram"]) 

  if(this.game["ram"].indexOf('1') > -1 || this.game["ram"].indexOf('2') > -1 || this.game["ram"].indexOf('3') > -1 || this.game["ram"].indexOf('4') > -1){
    this.ram = rams_4[Math.floor(Math.random() * rams_4.length)];
  }
  if(this.game["ram"].indexOf('5') > -1 || this.game["ram"].indexOf('6') > -1 || this.game["ram"].indexOf('7') > -1 || this.game["ram"].indexOf('8') > -1){
    this.ram = rams_8[Math.floor(Math.random() * rams_8.length)];
  }
  if(this.game["ram"].indexOf('9') > -1 || this.game["ram"].indexOf('10') > -1 || this.game["ram"].indexOf('11') > -1 || this.game["ram"].indexOf('12') > -1 || this.game["ram"].indexOf('13') > -1 || this.game["ram"].indexOf('14') > -1 || this.game["ram"].indexOf('15') > -1 || this.game["ram"].indexOf('16') > -1){
    this.ram = rams_16[Math.floor(Math.random() * rams_16.length)];
  }
  }

  findVga() {
    let vgas_1 = ['Gigabyte GT 970 OC 1GB', 'ASUS GTX990 1GB DDR5' ]; 
    let vgas_2 = ['ASUS Phoenix GT 1030 2GB OC', 'Gigabyte GT 1030 OC 2GB', 'MSI GT 1030 AERO ITX OC 2GB','Nvidia Quadro P400 2GB GDDR5','Nvidia Quadro K420 2GB GDDR3']; 
    let vgas_4 = ['ZOTAC GAMING GTX 1650 OC 4GB (2Y)', 'ASUS ROG STRIX GTX1650 4G GAMING 4GB DDR5', 'Gigabyte GTX 1650 4GB OC Dual Fan','GIGABYTE GTX 1660 Super OC 6GB','Gigabyte GTX 1660 Ti OC 6GB', 'MSI GTX 1650 VENTUS XS 4GB OC','MSI GTX 1650 GAMING X 4GB','MSI GTX 1660 Ti GAMING X 6GB','Nvidia Quadro P1000 4GB GDDR5']; 
    let vgas_8 = ['ZOTAC GAMING RTX 2080 AMP Extreme Core 8GB DDR6 (2Y)', 'Asus ROG Strix RTX 2060 Super 8GB', 'ASUS STRIX RTX 2080 SUPER 8GB DDR6','Gigabyte RTX™ 2070 SUPER WINDFORCE3 8GB','GIGABYTE RTX™ 2080 SUPER GAMING OC 8GB','MSI GTX 1070 ARMOR OC 8GB','MSI RTX 2060 SUPER™ ARMOR OC 8GB','MSI RTX 2070 SUPER™ VENTUS OC 8GB','MSI RTX 2080 SUPER™ VENTUS OC 8GB','MSI RTX 2080 SUPER™ GAMING X TRIO 8G','Nvidia Quadro P4000 8GB GDDR5']; 
    

    if(this.game["graphics"].indexOf('1GB') > -1 || this.game["graphics"].indexOf('1gb') > -1 ){
      this.vga = vgas_1[Math.floor(Math.random() * vgas_1.length)];
    }
    if(this.game["graphics"].indexOf('2GB') > -1 || this.game["graphics"].indexOf('2gb') > -1 ){
      this.vga = vgas_2[Math.floor(Math.random() * vgas_2.length)];
    }
    if(this.game["graphics"].indexOf('3GB') > -1 || this.game["graphics"].indexOf('3gb') > -1 || this.game["graphics"].indexOf('4GB') > -1 || this.game["graphics"].indexOf('4gb') > -1 ){
      this.vga = vgas_4[Math.floor(Math.random() * vgas_4.length)];
    }
    if(this.game["graphics"].indexOf('5GB') > -1 || this.game["graphics"].indexOf('5gb') > -1 || this.game["graphics"].indexOf('6GB') > -1 || this.game["graphics"].indexOf('6gb') > -1 || this.game["graphics"].indexOf('7GB') > -1 || this.game["graphics"].indexOf('7gb') > -1  || this.game["graphics"].indexOf('8GB') > -1 || this.game["graphics"].indexOf('8gb') > -1 ){
      this.vga = vgas_8[Math.floor(Math.random() * vgas_8.length)];
    }
  }

  findHdd() {
    let hdds = ['WD BLACK 1TB WD1003FZEX Performance Desktop Hard Disk (3Y)', 'WD BALCK 2TB WD2003FZEX Performance Desktop Hard Disk (3Y)', 'Toshiba P300 1TB 7200 RPM Hard Drive (2Y)','Western Digital Blue 2TB WD20EZRZ (2Y)','Seagate Barracuda 1TB ST1000DM010 (2Y)','Seagate Barracuda 500GB  (2Y)','Seagate Barracuda 250GB ST1000DM010 (2Y)'];   
    this.hdd = hdds[Math.floor(Math.random() * hdds.length)];
  }


}
