import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import IPetRepository from "./interface/IPetRepository";

export default class PetRepository implements IPetRepository {
  private repository:Repository<PetEntity>;

  constructor(repository: Repository<PetEntity>) {
    this.repository = repository;
  }
 
  criaPet(pet: PetEntity): void {
    this.repository.save(pet);
  }
  async listaPet(): Promise<PetEntity[]> {
   return await this.repository.find(); 
  }
  async atualizaPet(id: number, newPet: PetEntity): Promise<{ success: boolean; message?: string }> {
    try{
      const petUpdate = await this.repository.findOne({ where: {id}})
      if (!petUpdate) {
        return { success: false, message: "Pet não encontrado" };
      }
      Object.assign(petUpdate, newPet);

      await this.repository.save(petUpdate);

      return { success: true };

    }catch(error){
      console.log(error);
      return {
        success: false,
        message: "Ocorreu um erro ao tentar atualizar o pet.",
      };
    }
  }
  async deletaPet(id: number): Promise<{ success: boolean; message?: string }> {
    
      try {
        const petToRemove = await this.repository.findOne({ where: { id } });
  
        if (!petToRemove) {
          return { success: false, message: "Pet não encontrado" };
        }
  
        await this.repository.remove(petToRemove);
  
        return { success: true };

    } catch (error) {
      return {
        success: false,
        message: "Ocorreu um erro ao tentar atualizar o pet.",
      };
    }
  }

}