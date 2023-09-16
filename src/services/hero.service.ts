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
    .limit(perPage)
    .exec();

  const allHeroesCount = await Hero.find().count();

  const data = heroes.map((hero) => ({
    _id: hero._id,
    nickname: hero.nickname,
    image: hero.images[0],
  }));

  return {
    totalHeroes: allHeroesCount,
    heroes: data,
  };
};

const readOne = (id: string) => Hero.findById(id).exec();

const create = (data: Partial<IHero>) => Hero.create(data);

const update = (id: string, fieldsToUpdate: Partial<IHero>) =>
  Hero.findByIdAndUpdate(id, fieldsToUpdate).exec();

const remove = (id: string) => Hero.findByIdAndDelete(id).exec();

export default { read, readOne, create, update, remove };
