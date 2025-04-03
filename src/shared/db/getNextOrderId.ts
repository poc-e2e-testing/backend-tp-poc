import { orm } from "../db/orm.js"

export async function getNextOrderId(): Promise<number> {
  const db = (orm.em.getConnection() as any).getDb()
  
  const result = await db.collection("counters").findOneAndUpdate(
    { _id: "orderId" },
    { $inc: { seq: 1 } },
    { returnDocument: "after", upsert: true }
  )

  return result.value.seq
}
