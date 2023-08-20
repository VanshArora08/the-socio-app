"use server"

import { connectToDatabase } from "../mongoose"

export async function updateUser():Promise<void> {
    await connectToDatabase();

    await User.findOneAndUpdate({})

}