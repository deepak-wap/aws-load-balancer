import { Router } from "express";
import { addUser, getUsers } from "./user.controller.js";
import { validate } from "../common/pipes/validate.pipe.js";
import { CreateUserDto } from "./user.dto.js";
import { useGuards } from "../common/guards/useGuards.js";
import AuthGuard from "../guards/auth.guard.js";
import RoleGuard from "../guards/role.guard.js";
import ApiKeyGuard from "../guards/api-key.guard.js";

const router = Router();

router.post(
  "/",
  useGuards([ApiKeyGuard, AuthGuard, RoleGuard(["admin", "manager"])]),
  validate(CreateUserDto),
  addUser
);

router.get("/", getUsers);

export default router;
