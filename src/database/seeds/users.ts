import { Knex } from "knex";
import bcrypt from "bcryptjs";

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  is_active: boolean;
}

const users: User[] = [
  {
    id: "R000001",
    name: "Restu Dwi Cahyo",
    username: "resitdc",
    email: "restu@resitdc.id",
    password: "restuganteng",
    is_active: true,
  }
];

export const seed = async (knex: Knex): Promise<void> => {
  await Promise.all(
    users.map(async (user: User) => {
      const hashedPassword = await bcrypt.hash(user.password, 13);
      user.password = hashedPassword;
      return knex("users").insert(user);
    })
  );
}
