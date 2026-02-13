// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
//       <h1 className="text-4xl font-bold">Welcome to e-अतिथि</h1>
//       <div className="flex gap-4">
//         <Button asChild>
//             <Link href="/dashboard">Go to Dashboard</Link>
//         </Button>
//       </div>
//     </div>
//   );
// }
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CVR
          </CardTitle>
          <CardDescription className="text-base">
            Welcome back! Please login to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="h-11"
            />
          </div>
          <Button asChild className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Link href="/dashboard">Login</Link>
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}