import { Router } from "express";

import {
  deleteUser,
  editUser,
  loginUser,
  paginateUser,
  profile,
  registerUser,
  searchUser,
} from "../controllers/user-controller.js";
import { UserSchema } from "../utils/schema.js";
import { validateBody, validateToken } from "../utils/validator.js";

const router = Router();

router.route("/register").post(validateBody(UserSchema.register), registerUser);
router.route("/login").post(validateBody(UserSchema.login), loginUser);
router.route("/search").get(validateToken(), searchUser);

router.route("/paginate/:pageNum").get(paginateUser);
router.route("/profile").get(validateToken(), profile);

router
  .route("/edit")
  .patch(validateToken(), validateBody(UserSchema.editUser), editUser);
router
  .route("/delete")
  .delete(validateToken(), validateBody(UserSchema.userId), deleteUser);

export default router;
