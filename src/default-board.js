import { uuid } from "./utils";

export default {
  name: "trello clone",
  columns: [
    {
      name: "todo",
      tasks: [
        {
          description: "first",
          name: "first task",
          id: uuid(),
          userAssigned: null
        },
        {
          description: "",
          name: "second task",
          id: uuid(),
          userAssigned: null
        },
        {
          description: "",
          name: "and thrid",
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: "in-progress",
      tasks: [
        {
          description: "",
          name: "first task",
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: "done",
      tasks: [
        {
          description: "",
          name: "first task",
          id: uuid(),
          userAssigned: null
        }
      ]
    }
  ],
  telegram: {
    token: "",
    chatId: ""
  }
};
