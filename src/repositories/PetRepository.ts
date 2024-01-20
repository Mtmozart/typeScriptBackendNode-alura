import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import IPetRepository from "./interface/IPetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class PetRepository implements IPetRepository {
  private petRepository:Repository<PetEntity>;
  private adotanteRepository:Repository<AdotanteEntity>

  constructor(
    petRepository: Repository<PetEntity>,
    adotanteRepository: Repository<AdotanteEntity>
    ) {
    this.petRepository = petRepository;
    this.adotanteRepository = adotanteRepository;
  }
 
  criaPet(pet: PetEntity): void {
    this.petRepository.save(pet);
  }
  async listaPet(): Promise<PetEntity[]> {
   return await this.petRepository.find(); 
  }
  async atualizaPet(id: number, newPet: PetEntity): Promise<{ success: boolean; message?: string }> {
    try{
      const petUpdate = await this.petRepository.findOne({ where: {id}})
      if (!petUpdate) {
        return { success: false, message: "Pet não encontrado" };
      }
      Object.assign(petUpdate, newPet);

      await this.petRepository.save(petUpdate);

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
        const petToRemove = await this.petRepository.findOne({ where: { id } });
  
        if (!petToRemove) {
          return { success: false, message: "Pet não encontrado" };
        }
  
        await this.petRepository.remove(petToRemove);
  
        return { success: true };

    } catch (error) {
      return {
        success: false,
        message: "Ocorreu um erro ao tentar atualizar o pet.",
      };
    }
  }

  async adotaPet(idPet: number, idAdotante: number):
  Promise<{ success: boolean; message?: string }> {
  const pet = await this.petRepository.findOne({ where: { id: idPet }});
    if(!pet){
      return { success: false, message: "Pet não encontrado."}
    }
    
    const adotante = await this.adotanteRepository.findOne({
      where: {
        id: idAdotante
      }
      
    })
    if(!adotante){
      return { success: false, message: "Adotante não encontrado."}
    }

    pet.adotante =adotante;
    pet.adotado = true;
    await this.petRepository.save(pet)
    return { success: true}

  }

}