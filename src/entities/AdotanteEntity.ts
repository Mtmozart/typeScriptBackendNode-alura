import { Column, DefaultNamingStrategy, Entity, PrimaryGeneratedColumn } from "typeorm";

export default class AdotanteEntity{
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column()
  email: string;
  @Column()
  telefone: string;
  @Column()
  hasPet: boolean;


  constructor(nome: string, email: string, telefone: string, hasPet: boolean){
    this.nome = nome,
    this.email = email,
    this.telefone = telefone,
    this.hasPet = hasPet
  }
}