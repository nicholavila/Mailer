"use server";

import { prisma } from "@/lib/prisma";

// import db from "@/lib/db";
// import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

// const TableName = process.env.AWS_DYNAMODB_MAILING_LIST_TABLE_NAME;

// export const deleteSubscriber = async (
//   userEmail: string,
//   subscriberEmail: string
// ) => {
//   const command = new DeleteCommand({
//     TableName,
//     Key: { userEmail, subscriberEmail }
//   });

//   try {
//     const response = await db.send(command);
//     return { success: true, response };
//   } catch (error) {
//     return { error };
//   }
// };

export const deleteSubscriber = async (
  userEmail: string,
  subscriberEmail: string
) => {
  try {
    await prisma.mailinglist.deleteMany({
      where: {
        userEmail,
        subscriberEmail
      }
    });
    return { success: true };
  } catch (error) {
    return { error: true };
  }
};