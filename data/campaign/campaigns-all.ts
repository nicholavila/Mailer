"use server";

import { prisma } from "@/lib/prisma";

// import db from "@/lib/db";
// import { QueryCommand } from "@aws-sdk/lib-dynamodb";

// const TableName = process.env.AWS_DYNAMODB_CAMPAIGNS_TABLE_NAME;

// export const getAllCampaignsByEmail = async (userEmail: string) => {
//   const command = new QueryCommand({
//     TableName,
//     KeyConditionExpression: "userEmail = :userEmail",
//     ExpressionAttributeValues: {
//       ":userEmail": userEmail
//     }
//   });

//   try {
//     const response = await db.send(command);
//     return response.Items;
//   } catch (error) {
//     return null;
//   }
// };

export const getAllCampaignsByEmail = async (userEmail: string) => {
  try {
    return await prisma.campaigns.findMany({
      where: {
        userEmail
      }
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
