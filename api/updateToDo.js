"use strict";
const AWS = require("aws-sdk");

async function updateToDo(event) {
  const updatetodo = JSON.parse(event.body);
  console.log("Received the event", event);
  console.log("Received the event body", updatetodo);
  const { id } = event.pathParameters;
  console.log("Reading the id from params", id);
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  try {
    const params = {
      TableName: "TodoTable",
      Key: {
        id: id,
      },
      UpdateExpression: "SET todo = :todo, completed = :completed",
      ExpressionAttributeValues: {
        ":todo": updatetodo.todo,
        ":completed": updatetodo.completed,
      },
      ReturnValues: "ALL_NEW",
    };
    const result = await dynamodb.update(params).promise();
    console.log(result);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports.updateToDo = updateToDo;
