import AdotanteEntity from "../../entities/AdotanteEntity";

export default interface IAdotanteRepository {
  criaAdotante(adotante: AdotanteEntity): void | Promise<void>;  
  listarAdotantes(): Array<AdotanteEntity> | Promise<AdotanteEntity[]>
  atualizaAdotante(id: number, adotante:AdotanteEntity): Promise<{success: boolean; message?: string}>
  deletaAdotante(id: number): Promise<{success: boolean; message?: string}> | void;

}
