import { MessageRequestModel, MessageRequest } from "./message-request"

test("can be created", () => {
  const instance: MessageRequest = MessageRequestModel.create({})

  expect(instance).toBeTruthy()
})