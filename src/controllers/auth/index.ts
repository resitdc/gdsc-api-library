import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authSecret from "@config/auth";
import { generateId } from "@utils/helpers";
import { authResponse, successResponse, errorResponse } from "@utils/response";
import Users from "@models/Users.model";

export const login = async (req: Request, res: Response) => {
  const { user, password } = req.body;

  try {
    const dataUser = await Users.query()
      .select()
      .where((q) =>
        q.where("users.username", user)
          .orWhere("users.email", user)
      )
      .first();

    if (dataUser) {
      const comparePassword = bcrypt.compareSync(password, dataUser.password);

      if (!comparePassword) {
        return res.status(401).json(authResponse(false, "Invalid Password!"));
      }

      if (!dataUser.is_active) {
        return res.status(401).json(authResponse(false, "Sorry User Deactivate!"));
      }

      const token = jwt.sign({
        id: dataUser.id,
        username: dataUser.username,
        email: dataUser.email,
        name: dataUser.name,
      }, authSecret, {
        expiresIn: 1 * 12 * 60 * 60
      });

      const userData = {
        id: dataUser.id,
        name: dataUser.name,
        username: dataUser.username,
        email: dataUser.email,
        avatar: dataUser.avatar
      };

      res.status(200).json(authResponse(true, "Success!", token, userData));
    } else {
      res.status(404).json(authResponse(false, "User Not Found!"));
    }
  } catch (error) {
    res.status(500).json(authResponse(false, `ERROR! ===> ${error}`));
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, password: formPassword, email } = req.body;
  
  try {
    const id: string = generateId(name);
    const hashedPassword: string = await bcrypt.hash(formPassword, 13);
    
    interface FormData {
      id: string;
      name: string;
      password: string;
      email: string;
      is_active: boolean;
    }
    
    const formData: FormData = {
      id,
      name,
      email,
      password: hashedPassword,
      is_active: true
    };

    const isUserExist = await Users.query().findOne({"users.email": email});

    if (isUserExist) {
      res.status(409).json(
        errorResponse("Email already exists", { results: null })
      );
    } else {
      const user = await Users.query().insert(formData);
      const { password, is_active, ...rest } = user;
      const updatedUser = { ...rest, isActive: is_active };
      
      res.status(201).json(
        successResponse("Success", { results: updatedUser })
      );
    }
  } catch (error) {
    res.status(504).json(
      errorResponse("Internal server error", { results: null })
    );
  }
};