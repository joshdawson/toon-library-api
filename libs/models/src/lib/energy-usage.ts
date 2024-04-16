export enum EnergyType {
  electricity = 'electricity',
  gas = 'gas',
  water = 'water'
}

export enum EnergyUsageUnit {
  kWh = 'kWh',
  m3 = '㎥'
}

export interface EnergyUsageDto {
  id: string;
  month: string;
  year: number;
  energyType: EnergyType;
  unit: EnergyUsageUnit;
  value: string;
}