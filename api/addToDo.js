"use strict";
const { v4 } = require("uuid");
const AWS = require("aws-sdk");

async function addToDo(event) {
  const { todo } = JSON.parse(event.body);
  const createdttm = new Date().toISOString();
  const id = v4();
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  console.log(`The id for new Todo is ${id}`);
  const newTodo = {
    id,
    todo,
    createdttm,
    completed: false,
  };
  const result = await dynamodb
    .put({
      TableName: "TodoTable",
      Item: newTodo,
    })
    .promise();
  console.log(result);
  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
}

module.exports.addToDo = addToDo;
