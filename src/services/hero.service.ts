import { Hero } from "../models/hero.model";
import { IHero } from "../types/hero";

type Params = {
  page: string;
  perPage: string;
};

const getAll = async ({ page, perPage }: Params) => {
  const offset = +perPage * (+page - 1);
  const heroes = await Hero.find().skip(offset).limit(+perPage);

  return heroes;
};

const create = async (data: IHero) => {
  const newHero = await Hero.create(data);

  return newHero;
};

export default { getAll, create };
