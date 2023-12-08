import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  return "OK"
});
