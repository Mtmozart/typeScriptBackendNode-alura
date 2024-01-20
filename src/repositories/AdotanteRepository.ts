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

  async atualizaAdotante(
    id: number,
    newData: AdotanteEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adotanteToUpdate = await this.repository.findOne({ where: { id } });

      if (!adotanteToUpdate) {
        return { success: false, message: "Adotante não encontrado" };
      }

      Object.assign(adotanteToUpdate, newData);

      await this.repository.save(adotanteToUpdate);

      return { success: true };
    } catch (error) {
      console.log(error);
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
