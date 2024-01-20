import { Column, DefaultNamingStrategy, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import EnderecoEntity from "./EnderecoEntity";

@Entity()
export default class AdotanteEntity{
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column()
  senha: string;
  @Column()
  celular: string;
  @Column({nullable:true})
  foto?: string;
  @OneToOne(() => EnderecoEntity,{nullable: true, cascade: true, eager: true })
  @JoinColumn()//indica um campo estrangeiro para o adotante
  endereco?: EnderecoEntity;


  constructor(nome: string, senha: string, celular: string, foto?:string, endereco?: EnderecoEntity){
    this.nome = nome,
    this.senha = senha;
    this.celular = celular,
    this.foto = foto,
    this.endereco = endereco
  }
}