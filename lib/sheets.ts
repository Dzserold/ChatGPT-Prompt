"use server";
import { google } from "googleapis";

interface Data {
  prompt: String;
  result: String;
  timestamp: Date;
}
export async function createPost(result: Data) {
  try {
    //auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        ),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    //Creating data in the sheets
    const response = await sheets.spreadsheets.values.append({
      valueInputOption: "USER_ENTERED",
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:C1",
      requestBody: {
        values: [
          [result.timestamp, result.prompt, result.result],
        ],
      },
    });

    return {
      staus: 200,
      message: "AI prompt created Succesfully",
    };
  } catch (error) {
    console.log(error);
    return {
      staus: 500,
      message: "Something went wrong",
    };
  }
}
export async function getPost() {
  try {
    //auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        ),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:C999",
    });
    const data = response.data.values;

    return { status: 200, data };
  } catch (error) {
    console.log(error);
    return {
      staus: 500,
      message: "Something went wrong",
    };
  }
}
