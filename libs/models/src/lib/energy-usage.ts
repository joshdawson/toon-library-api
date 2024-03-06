export type EnergyType = 'electricity';

export type EnergyUsageUnit = 'kWh';

export interface EnergyUsageDto {
  month: string;
  year: number;
  energyType: EnergyType;
  unit: EnergyUsageUnit;
  value: string;
}