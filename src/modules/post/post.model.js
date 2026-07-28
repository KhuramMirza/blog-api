import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

class JsonModel {
  constructor(filename) {
    this.filePath = path.resolve(process.cwd(), "data", filename);
  }

  async #readData() {
    try {
      const rawData = await fs.readFile(this.filePath, "utf8");
      return JSON.parse(rawData);
    } catch (error) {
      if (error.code === "ENOENT") {
        await this.#writeData([]);
        return [];
      }
      throw error;
    }
  }

  async #writeData(data) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), "utf8");
  }

  async create(payload) {
    const data = await this.#readData();
    const item = {
      id: randomUUID(),
      ...payload,
      createdAt: Date.now().toString(),
    };
    data.push(item);
    await this.#writeData(data);
    return item;
  }

  async find() {
    return await this.#readData();
  }

  async findById(id) {
    const data = await this.#readData();
    return data.find((item) => item.id === id);
  }

  async findByIdAndUpdate(id, updatedData) {
    const data = await this.#readData();
    const item = data.filter((item) => item.id === id);
    const newItem = { ...item, ...updatedData, createdAt: Date.now() };
    await this.#writeData(
      data.filter((item) => item.id !== newItem).push(newItem),
    );
  }

  async findByIdAndDelete(id) {
    const data = await this.#readData();
    const item = data.filter((item) => item.id === id);
    if (!item) {
      throw new Error(`Could not find item: ${id}`);
    }
    await this.#writeData(data.filter((item) => item.id !== id));
  }
}

export default new JsonModel("posts.json");
