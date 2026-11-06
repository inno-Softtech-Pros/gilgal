// backend/src/repositories/calendarRepository.js
const { GetCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const dynamoDB = require("../config/dynamodb");

const calendarTable = `${process.env.CHURCH_ID}__CALENDAR`;

const getEventById = async (id) => {
  const result = await dynamoDB.send(
    new GetCommand({
      TableName: calendarTable,
      Key: { id }
    })
  );
  return result.Item || null;
};

const getEvents = async ({ startDate, endDate, status, limit = 50, lastEvaluatedKey } = {}) => {
  const params = {
    TableName: calendarTable,
    Limit: Math.min(limit, 100)
  };

  const filterExpressions = [];
  const expressionAttributeValues = {};
  const expressionAttributeNames = {};

  if (startDate) {
    filterExpressions.push("#dt >= :startDate");
    expressionAttributeValues[":startDate"] = startDate;
    expressionAttributeNames["#dt"] = "date";
  }
  if (endDate) {
    filterExpressions.push("#dt <= :endDate");
    expressionAttributeValues[":endDate"] = endDate;
    expressionAttributeNames["#dt"] = "date";
  }
  if (status) {
    filterExpressions.push("#st = :status");
    expressionAttributeValues[":status"] = status;
    expressionAttributeNames["#st"] = "status";
  }

  if (filterExpressions.length > 0) {
    params.FilterExpression = filterExpressions.join(" AND ");
    params.ExpressionAttributeValues = expressionAttributeValues;
    params.ExpressionAttributeNames = expressionAttributeNames;
  }

  if (lastEvaluatedKey) {
    params.ExclusiveStartKey = lastEvaluatedKey;
  }

  const result = await dynamoDB.send(new ScanCommand(params));

  return {
    events: result.Items || [],
    count: result.Count,
    lastEvaluatedKey: result.LastEvaluatedKey,
    hasMore: !!result.LastEvaluatedKey
  };
};

const getUpcomingEvents = async (limit = 50) => {
  const today = new Date().toISOString().split("T")[0];
  return getEvents({ startDate: today, status: "scheduled", limit });
};

module.exports = { getEventById, getEvents, getUpcomingEvents };
