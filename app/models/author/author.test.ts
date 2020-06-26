import { AuthorModel, Author } from "./author"

test("can be created", () => {
  const instance: Author = AuthorModel.create({})

  expect(instance).toBeTruthy()
})