import { FormGroup, FormControl } from '@angular/forms';

export class Model {
    priceForm: FormGroup;
    settingsForm: FormGroup;

    total_price = 0;
    budget_loop = 1;
    total_loop = 0;

    Ram = [];
    Vga = [];
    Cpu = [];
    Motherboard = [];
    Hard_Disk = [];
    Budget_Pro = [];

    min_ram = 0;
    max_ram = 4500;
    min_vga = 0;
    max_vga = 7500;
    min_cpu = 0;
    max_cpu = 6500;
    min_motherboard = 0;
    max_motherboard = 4500;
    min_hard_disk = 0;
    max_hard_disk = 2500;

}