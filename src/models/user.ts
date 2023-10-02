import Client from "../database";

export type User = {
  id: Number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find the user ${id}. Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (id, firstname, lastname, password) VALUES($1, $2, $3,$4) RETURNING *";

      const conn = await Client.connect();
      // TODO: hash the password
      const result = await conn.query(sql, [
        user.id,
        user.firstName,
        user.lastName,
        user.password,
      ]);

      const newUser = result.rows[0];

      conn.release();

      return newUser;
    } catch (err) {
      throw new Error(`Could not add new user ${user.id}. Error: ${err}`);
    }
  }
}
