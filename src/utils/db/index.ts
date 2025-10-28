import { getAll } from "./actions/getAll";
import { getById } from "./actions/getById";
import { getByUser } from "./actions/getByUser";
import { getByBoard } from "./actions/getByBoard";
import { create } from "./actions/create";
import { deleteById } from "./actions/delete";

export const db = {
  getAll,
  getById,
  getByUser,
  getByBoard,
  create,
  delete: deleteById,
};
