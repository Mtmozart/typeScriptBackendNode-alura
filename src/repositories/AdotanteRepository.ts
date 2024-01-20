import AdotanteEntity from "../entities/AdotanteEntity"
import { Repository } from "typeorm";
import IAdotanteRepository from "./interface/IAdotanteRepository";

export default class implements IAdotanteRepository{

  private repository:Repository<AdotanteEntity>;

  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository;
  }

  async criaAdotante(adotante: AdotanteEntity): Promise<void> {
    await this.repository.save(adotante);
  }
  async listarAdotantes(): Promise<AdotanteEntity[]>{
    return await this.repository.find();
  }

  async atualizaAdotante(id: number, newAdotante: AdotanteEntity): Promise<{ success: boolean; message?: string }> {
  try {
    const adotanteUpdate = await this.repository.findOne({where: {id}})
    if (!adotanteUpdate) {
      return { success: false, message: "Usuário não encnotrado" };
    }
    Object.assign(adotanteUpdate, newAdotante);

    return { success: true };
  } catch (e) {
    console.log(e);
      return {
        success: false,
        message: "Ocorreu um erro ao tentar atualizar o adotante.",
      };
    
  }
  }
  async deletaAdotante(id: number):  Promise<{ success: boolean; message?: string }> {
      try{
        const adotanteForDelete = await this.repository.findOne({where: {id}})
        if(!adotanteForDelete){
          return {success: false, message: "Adotante não encontrado!"}
        }
        await this.repository.remove(adotanteForDelete)
        
        return { success: true };

      }catch (e) {
    console.log(e);
      return {
        success: false,
        message: "Ocorreu um erro ao tentar deletar o adotante.",
      };
  }

}
 

}
