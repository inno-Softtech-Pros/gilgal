const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
const dynamoDB = require("../config/dynamodb");

const getTableName = (churchId, suffix) => {
  // churchId ends up in a table name, so validate it
  if (!/^[A-Za-z0-9_-]+$/.test(churchId || "")) {
    const error = new Error("Invalid churchId");
    error.statusCode = 400;
    throw error;
  }
  return `${churchId}__${suffix}`;
};

const scanAll = async (tableName) => {
  const items = [];
  let lastKey;

  do {
    const result = await dynamoDB.send(
      new ScanCommand({
        TableName: tableName,
        ProjectionExpression:
          "platformId, #title, description, thumbnail, publishedAt, contentUrl, #dur",
        ExpressionAttributeNames: {
          "#title": "title",
          "#dur": "duration",
        },
        ExclusiveStartKey: lastKey,
      })
    );

    items.push(...(result.Items || []));
    lastKey = result.LastEvaluatedKey;
  } while (lastKey);

  return items;
};

const getLatest = async (suffix, churchId, limit) => {
  const items = await scanAll(getTableName(churchId, suffix));

  return items
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit)
    .map((item) => ({
      id: item.platformId,
      title: item.title,
      description: item.description,
      thumbnail: item.thumbnail,
      date: item.publishedAt,
      videoUrl: item.contentUrl,
      duration: item.duration,
    }));
};

const getLatestSermons = (churchId, limit) =>
  getLatest("SERMONS", churchId, limit);

const getLatestMusic = (churchId, limit) =>
  getLatest("MUSIC", churchId, limit);

module.exports = { getLatestSermons, getLatestMusic };