export class Laptop{

    cpuModel:string;
    cpuCoresSize:string;
    cpuCachSize:string;
    cpuBoostSpeed:string;
    ramType:string;
    ramSize:string;
    storageType:string;
    storageSize:string;
    batteryType:string;
    batteryCapacity:string;
    gpuMemorySize:string;
    gpuBooStSpeed:string;

    constructor(laptop){
        this.cpuModel = laptop.cpuModel;
        this.cpuCoresSize = laptop.cpuCoresSize;
        this.cpuCachSize = laptop.cpuCachSize;
        this.cpuBoostSpeed = laptop.cpuBoostSpeed;
        this.ramType = laptop.ramType;
        this.ramSize = laptop.ramSize;
        this.storageType = laptop.storageType;
        this.storageSize = laptop.storageSize;
        this.batteryType = laptop.batteryType;
        this.batteryCapacity = laptop.batteryCapacity;
        this.gpuMemorySize = laptop.gpuMemorySize;
        this.gpuBooStSpeed = laptop.gpuBooStSpeed;
    }
}