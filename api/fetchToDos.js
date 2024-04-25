"use strict";
const AWS = require("aws-sdk");

async function fetchToDos(event) {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  let todos;
  try {
    const result = await dynamodb
      .scan({
        TableName: "TodoTable",
      })
      .promise();
    console.log(result);
    todos = result.Items;
    return {
      statusCode: 200,
      body: JSON.stringify(todos),
    };
  } catch (err) {
    console.log(err);
  }
}

module.exports.fetchToDos = fetchToDos;
