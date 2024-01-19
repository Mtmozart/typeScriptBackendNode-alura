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
}


