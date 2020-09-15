import AWS from 'aws-sdk';
import { APIGatewayEvent } from 'aws-lambda';

const Update = async (event: APIGatewayEvent, dbClient: AWS.DynamoDB.DocumentClient, segment: string) => {
	const id = segment;
	const { title } = event.body && JSON.parse(event.body);
	const params = {
		TableName: process.env.PRODUCTS_TABLE_NAME || '',
		Item: {
			id: id,
			title: title,
		},
	};
	try {
		const data = await dbClient.put(params).promise();
		const response = {
			statusCode: 200,
			body: JSON.stringify(params.Item),
		};
		return response;
	} catch (e) {
		return {
			statusCode: 500,
		};
	}
};

export default Update;
