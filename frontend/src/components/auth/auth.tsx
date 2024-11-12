import { PropsAuth } from "../../types/auth";
import { AuthLayout } from "../layouts/AuthLayouts";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/input/PasswordInput";

export default function Auth({ fields, step, onSubmit, image }: PropsAuth) {
  return (
    <div className="relative h-screen text-white w-full overflow-hidden">
      <img
        src={image}
        alt="Login background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative w-full justify-center h-full flex items-center px-4">
        <Card className="w-full shadow-xl max-w-md p-4 bg-white/10 backdrop-blur-sm border-none">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-3xl font-bold">
              {step === "signin" ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <p className="text-sm text-gray-400">
              {step === "signin"
                ? "Please sign in to your account"
                : "Please sign up for an account"}
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={onSubmit}>
              {fields.map(
                ({
                  Icon,
                  id,
                  name,
                  onChange,
                  placeholder,
                  value,
                  isPassword,
                  type,
                  label,
                  error,
                }) => (
                  <div className="space-y-2" key={id}>
                    <label
                      htmlFor={name}
                      className="text-sm font-medium text-white">
                      {label}
                    </label>
                    <div className="relative">
                      {Icon && !isPassword && (
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                          {Icon}
                        </div>
                      )}

                      {isPassword ? (
                        <PasswordInput
                          id={id}
                          name={name}
                          value={value}
                          onChange={onChange}
                          placeholder={placeholder}
                          className="pl-10"
                        />
                      ) : (
                        <Input
                          id={id}
                          name={name}
                          type={type}
                          value={value}
                          onChange={onChange}
                          placeholder={placeholder}
                          className="pl-10"
                        />
                      )}
                    </div>
                    {error && (
                      <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                  </div>
                )
              )}
              <Button type="submit" className="w-full mt-4">
                {step === "signin" ? "Sign In" : "Sign Up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-gray-400">
              {step === "signin" ? (
                <>
                  Don't have an account?{" "}
                  <a
                    href="/auth/register"
                    className="text-blue-400 hover:underline">
                    Sign up
                  </a>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <a
                    href="/auth/login"
                    className="text-blue-400 hover:underline">
                    Sign in
                  </a>
                </>
              )}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
