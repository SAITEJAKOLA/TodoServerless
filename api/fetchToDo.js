"use strict";
const AWS = require("aws-sdk");

async function fetchToDo(event) {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  let fetchtodo;
  try {
    const result = await dynamodb
      .get({
        TableName: "TodoTable",
        Key: { id },
      })
      .promise();
    console.log(result);
    fetchtodo = result.Item;
    return {
      statusCode: 200,
      body: JSON.stringify(fetchtodo),
    };
  } catch (err) {
    console.log(err);
  }
}

module.exports.fetchToDo = fetchToDo;
