import { User } from "@prisma/client"

export type UserData = Omit<User, 'password'>;
export interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    email: string;
  };
}