"use server";

import db from "@/lib/db";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_CAMPAIGNS_TABLE_NAME;

export const deleteCampaign = async (userEmail: string, campaignId: string) => {
  const command = new DeleteCommand({
    TableName,
    Key: { userEmail, campaignId }
  });

  try {
    const response = await db.send(command);
    return { success: true, response };
  } catch (error) {
    return { error };
  }
};