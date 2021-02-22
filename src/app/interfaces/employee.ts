export interface Employee {
  $key?: string;
  nombre: string;
  apellido: string;
  tipoDocumento: DocType;
  numeroDocumento: number;
  fechaNacimiento: Date;
  area: Areas;
}

export enum DocType {
  CC = 'Cédula de ciudadania',
  TI = 'Tarjeta de identidad',
  PA = 'Pasaporte',
  VI = 'Visa',
  PE = 'Permiso de residencia',
}

export enum Areas {
  Comercial = 'Comercial',
  Sistemas = 'Sistemas',
  Financiero = 'Financiero',
  Gestion = 'Gestión Humana',
}
