"use strict"
import { Buffer } from "node:buffer"
import fs from "fs"
/**
 * datastoreの境界値テストのためのデータ作成
 * エンティティ10485760bytes以上のデータを作成する
 */
async function main() {
  const limit = 10485760
  const base_data = await JSON.parse(
    fs.readFileSync("./test_data.json", "utf8")
  )
  const str_buffer = Buffer.from(JSON.stringify(base_data)).length
  const byte_gap = limit - str_buffer

  if (byte_gap < 0) {
    console.log("文字数が既に上限を超えています")
    return
  }
  const repeat_time = Math.ceil(limit / str_buffer)
  const result = [base_data]
  for (let l = 0; l < repeat_time; l++) {
    result.push(base_data)
  }
  if (Buffer.from(JSON.stringify(result)).length > limit) {
    console.log(Buffer.from(JSON.stringify(result)).length)
    fs.appendFile("./result.json", JSON.stringify(result), (err) => {
      if (err) console.log(err)
    })
  } else {
    console.log("テストデータの作成に失敗しました")
  }
}

main()
