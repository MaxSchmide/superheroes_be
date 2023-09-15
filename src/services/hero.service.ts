import { Hero } from "../models/hero.model";
import { IHero } from "../types/hero";

type Params = {
  page: number;
  perPage: number;
};

const read = async ({ page, perPage }: Params) => {
  const offset = perPage * (page - 1);
  const heroes = await Hero.find({}, "nickname images")
    .skip(offset)
    .limit(perPage);

  const allHeroesCount = await Hero.find().count();

  const totalPages = Math.ceil(allHeroesCount / perPage);

  return {
    totalPages,
    data: heroes,
  };
};

const readOne = (id: string) => Hero.findById(id);

const create = (data: Partial<IHero>) => Hero.create(data);

const update = (id: string, fieldsToUpdate: Partial<IHero>) =>
  Hero.findByIdAndUpdate(id, fieldsToUpdate);

const remove = (id: string) => Hero.findByIdAndDelete(id);

export default { read, readOne, create, update, remove };
