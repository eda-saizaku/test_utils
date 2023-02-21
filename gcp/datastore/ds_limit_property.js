"use strict"
import { Buffer } from "node:buffer"
/**
 * datastoreの境界値テストのためのデータ作成
 * プロパティ1500bytes以上のデータを作成する
 * @param {String} str //作成元の任意の文字列
 */
function main(str) {
  const limit = 1500
  const str_buffer = Buffer.from(str)?.length
  const not_enough = limit - str_buffer

  if (not_enough < 0) {
    console.log("文字数が既に上限を超えています")
    return
  }

  const repeat_num = Math.ceil(limit / str_buffer)
  let result = str

  for (let l = 0; l < repeat_num; l++) {
    result += str
  }
  console.log(Buffer.from(result).length)
  console.log(result)
}

const args = process.argv
if (args.length != 3) {
  console.log("useage: node ds_limit_entity.js <str>")
} else {
  const str = args[2]
  main(str)
}
