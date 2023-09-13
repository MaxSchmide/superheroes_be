import { Hero } from "../models/hero.model";
import { IHero } from "../types/hero";

type Params = {
  page: string;
  perPage: string;
};

const read = async ({ page, perPage }: Params) => {
  const offset = +perPage * (+page - 1);
  const heroes = await Hero.find().skip(offset).limit(+perPage);

  return heroes;
};

const create = async (data: IHero) => {
  const newHero = await Hero.create(data);

  return newHero;
};

const update = async (id: string, fieldsToUpdate: Partial<IHero>) => {
  const updatedHero = await Hero.findByIdAndUpdate(id, fieldsToUpdate);

  return updatedHero;
};

const remove = async (id: string) => {
  const result = await Hero.findByIdAndDelete(id);
  console.log(result);

  return result;
};

export default { read, create, update, remove };
