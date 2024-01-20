import { Request, Response } from 'express'
import AdotanteEntity from '../entities/AdotanteEntity'
import AdotanteRepository from '../repositories/AdotanteRepository';
 
export default class AdotanteController {
  constructor(private repository: AdotanteRepository){}
  
async criaAdotante(req: Request, res: Response) {
  try {
    const { nome, senha, celular, endereco, foto,  } = <AdotanteEntity>req.body;

    const novoAdotante = new AdotanteEntity(
      nome,
      senha,
      celular,
      foto,
      endereco
    );

    await this.repository.criaAdotante(novoAdotante);
    return res.status(201).json(novoAdotante);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erro ao criar o adotante' });
  }
}

async listarAdotantes(req: Request, res: Response){
  const listarAdotantes = await this.repository.listarAdotantes();
  return res.status(200).json(listarAdotantes)
}

async atualizaAdotante (req: Request, res: Response) {
  const { id } = req.params;
  const { success, message } = await this.repository.atualizaAdotante(
    Number(id),
    req.body as AdotanteEntity
  );
  if (!success) {
    return res.status(404).json({ message });
  }
  return res.sendStatus(204);
 
}
async deletaAdotante(req: Request, res: Response) {
  const { id } = req.params;

  const { success, message } = await this.repository.deletaAdotante(Number(id));

  if (!success) {
    return res.status(404).json({ message });
  }
  return res.sendStatus(204);
}


}